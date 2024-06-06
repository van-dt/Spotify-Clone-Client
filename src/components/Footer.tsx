const Footer = () => {
  return (
    <div className=" bg-neutral-900">
      <div className="mx-6 border-t border-neutral-400">
        <div className="max-w-2xl mx-auto text-white pb-10">
          <div className="mt-12 flex flex-col md:flex-row md:justify-between items-center text-sm text-neutral-400">
            <p className="order-2 md:order-1 mt-8 md:mt-0">
              {" "}
              &copy; Beautiful Footer, 2024.{" "}
            </p>
            <div className="order-1 md:order-2">
              <span className="px-2">About us</span>
              <span className="px-2 border-l">Contact us</span>
              <span className="px-2 border-l">Privacy Policy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
