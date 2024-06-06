import { CategoryData } from "../types";
import CategoryItem from "./CategoryItem";

interface CategoryContentProps {
  categories: CategoryData[];
}

const CategoryContent = ({ categories }: CategoryContentProps) => {
  if (categories.length === 0)
    return (
      <div className="mt-4 text-neutral-400">No categories available.</div>
    );
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-4 mt-4">
      {categories.map((category) => (
        <CategoryItem key={category.id} data={category} />
      ))}
    </div>
  );
};

export default CategoryContent;
