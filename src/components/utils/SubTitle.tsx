import { Link } from "react-router-dom";

interface IProps {
  redirectPath: string;
  title: string;
  btnTitle?: string;
}

const SubTitle = ({ redirectPath, title, btnTitle }: IProps) => {
  return (
    <div className="flex flex-wrap items-center justify-between ">
      <p className="text-lg font-semibold">{title}</p>
      {btnTitle ? (
        <Link
          className="rounded-lg bg-black px-3 py-2 text-white"
          to={redirectPath}
          color={"dark"}
        >
          Show More
        </Link>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SubTitle;
