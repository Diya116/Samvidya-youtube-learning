import { Request, Response } from "express";
import prisma from "../../lib/db";
import { noteSchema } from "./schema";

interface AuthenticatedRequest extends Request {
  user: {
    id: number;
    name?: string;
    email?: string;
    [key: string]: any;
  };
}
export const createNote = async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthenticatedRequest;
    const userId = authReq.user?.id;

    if (!userId) {
       res.status(401).json({ error: "Unauthorized access: user Id not found" });
       return;
    }

    const userExists = await prisma.user.findUnique({ where: { id: userId } });
    if (!userExists) {
       res.status(400).json({ error: "User does not exist" });
       return;
    }

    const validateData = noteSchema.safeParse(req.body);
    console.log("data",req.body);
    if (!validateData.success) {
       res.status(400).json({ error: validateData.error.errors });
       return;
    }

    const { title, content, courseId } = validateData.data;
    const note = await prisma.note.create({
      data: { title, content, userId, ...(courseId !== undefined && { courseId }) },
    });

     res.status(201).json({ message: "Note created successfully", note });
  } catch (error) {
    console.error("Error while creating note:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllNotesOfUser = async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthenticatedRequest;
    const userId = authReq.user?.id;

    if (!userId) {
       res.status(401).json({ error: "Unauthorized access: user Id not found" });
       return;
    }

    const notes = await prisma.note.findMany({ where: { userId } });
    res.status(200).json({ notes });
    return;
  } catch (error) {
    console.error("Error while fetching notes:", error);
     res.status(500).json({ error: "Internal Server Error" });
     return;
  }
};

export const getSingleNoteById = async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthenticatedRequest;
    const userId = authReq.user?.id;
    const noteId = req.params.id;

    if (!userId) {
      res.status(401).json({ error: "Unauthorized access" });
      return;
    }

    const note = await prisma.note.findFirst({ where: { id: noteId, userId } });
    if (!note) {
       res.status(404).json({ error: "Note not found" });
       return;
    }

     res.status(200).json({ note });
     return;
  } catch (error) {
    console.error("Error while fetching note by ID:", error);
     res.status(500).json({ error: "Internal Server Error" });
     return;
  }
};

export const getNotesByCourse = async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthenticatedRequest;
    const userId = authReq.user?.id;
    const courseId = req.params.courseId;
console.log({courseId})
    if (!userId) {
      res.status(401).json({ error: "Unauthorized access" });
      return;
    }

    const notes = await prisma.note.findMany({ where: { userId, courseId } });
    console.log(notes)
     res.status(200).json({ notes:notes });
     return;
  } catch (error) {
    console.error("Error while fetching notes by lesson:", error);
     res.status(500).json({ error: "Internal Server Error" });
     return;
  }
};


export const updateNote = async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthenticatedRequest;
    const userId = authReq.user?.id;
    console.log("userId",userId)
    const noteId = req.params.id;
     console.log("note id",noteId)
    if (!userId) {
       res.status(401).json({ error: "Unauthorized access" });
      return;
    }

    const existingNote = await prisma.note.findFirst({ where: { id: noteId, userId } });
    if (!existingNote) {
       res.status(404).json({ error: "Note not found or not owned by user" });
       return;
    }

    const validateData = noteSchema.partial().safeParse(req.body); 
    if (!validateData.success) {
       res.status(400).json({ error: validateData.error.errors });
       return;
    }

    const updatedNote = await prisma.note.update({
      where: { id: noteId },
      data: validateData.data,
    });

     res.status(200).json({ message: "Note updated successfully", note: updatedNote });
     return;
  } catch (error) {
    console.error("Error while updating note:", error);
     res.status(500).json({ error: "Internal Server Error" });
     return;
  }
};

export const deleteNote = async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthenticatedRequest;
    const userId = authReq.user?.id;
    const noteId = req.params.id;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized access" });
    }

    const existingNote = await prisma.note.findFirst({ where: { id: noteId, userId } });
    if (!existingNote) {
      return res.status(404).json({ error: "Note not found or not owned by user" });
    }

    await prisma.note.delete({ where: { id: noteId } });
    return res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error while deleting note:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

