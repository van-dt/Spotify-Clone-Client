import { useRouter } from "next/navigation";
import Image from "next/image";
import { CategoryData } from "../types";

interface CategoryItemProps {
  data: CategoryData;
}

const CategoryItem = ({ data }: CategoryItemProps) => {
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  return (
    <button
      onClick={() => router.push(`categories/${data.id}`)}
      className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:opacity-80 transition"
    >
      <div className="relative aspect-square w-full h-full overflow-hidden">
        <Image
          src={data.image ? `${apiUrl}${data.image}` : "/images/user.png"}
          alt="Category image"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col items-start w-fit pt-4 gap-y-1 text-left absolute top-1 left-4">
        <p className="font-bold truncate w-full text-2xl">
          {data.categoryName}
        </p>
      </div>
    </button>
  );
};

export default CategoryItem;
