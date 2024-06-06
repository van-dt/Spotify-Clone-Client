import { AuthorData } from "../types";
import AuthorItem from "./AuthorItem";

interface AuthorContentProps {
  authors: AuthorData[];
}

const AuthorContent = ({ authors }: AuthorContentProps) => {
  if (authors.length === 0)
    return <div className="mt-4 text-neutral-400">No authors available.</div>;
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4">
      {authors.map((author) => (
        <AuthorItem key={author.id} data={author} />
      ))}
    </div>
  );
};

export default AuthorContent;
