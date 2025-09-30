import emptystateimage from "@/assets/image.png";
export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center mt-24 gap-6 text-center px-4">
      {/* Illustration */}
      <img
        src={emptystateimage}
        alt="No courses"
        className="w-48 h-48 object-contain opacity-80"
      />

      {/* Title */}
      <h2 className="text-xl font-semibold text-foreground">
        No courses yet
      </h2>

      {/* Description */}
      <p className="text-sm text-muted-foreground max-w-sm">
        You haven’t created any courses. Start by adding a new course 
      </p>
    </div>
  );
}

