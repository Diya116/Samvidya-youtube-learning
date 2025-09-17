import emptystateimage from "@/assets/image.png";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center mt-20 gap-4 text-center">
      <img src={emptystateimage} alt="No courses" className="w-40 h-40 object-contain opacity-80" />
      <h2 className="text-lg font-semibold text-forground">No courses available</h2>
      <p className="text-sm text-forground/70">
        Start by adding a new course by clicking Create course
      </p>
    </div>
  );
}
