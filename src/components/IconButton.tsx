interface Props {
  icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
      title?: string;
      titleId?: string;
    } & React.RefAttributes<SVGSVGElement>
  >;
  label: string;
}

const IconButton = ({ icon: Icon, label }: Props) => {
  return (
    <button className="flex items-center space-x-2 hover:text-white">
      <Icon className="w-5 h-5" title="" />
      <span>{label}</span>
    </button>
  );
};

export default IconButton;
