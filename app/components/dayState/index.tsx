import Image from "next/image";

const DayState = ({ day }: { day: boolean | undefined }) => {
  let image: [string, string, number?] = ["/Ellipse2.png", "gray mark", 24];

  if (day === true) image = ["/Frame.svg", "green mark", 24];
  if (day === false) image = ["/Frame1.svg", "red mark", 24];

  const [src, alt, size] = image;
  return (
    <div className="flex items-center justify-center w-9 h-9 cursor-pointer">
      <Image src={src} alt={alt} width={size} height={size} />
    </div>
  );
};

export default DayState;
