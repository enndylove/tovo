type ErrorStatus = "200" | "404" | "500";

interface ErrorProps {
  status: ErrorStatus,
  title: string,
  description: string,
  children?: React.ReactNode,
}

export function Error({
  status,
  title,
  description,
  children
}: ErrorProps) {
  const getImage = (status: ErrorStatus) => {
    switch (status) {
      case "200":
        return "/icons/200Icon.svg";
      case "404":
        return "/icons/404Icon.svg";
      case "500":
        return "/icons/500Icon.svg";
      default:
        return "";
    }
  };

  return (
    <div className="w-full flex flex-col gap-3.5 items-center">
      <img className="absolute right-0 -bottom-3" src="/background/logo.svg" />
      <div className="absolute max-w-sm w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col text-center items-center gap-2">
          <img
            src={getImage(status)}
            alt={status}
            className="max-w-20 w-full object-cover"
          />
          <h1 className="text-3xl tracking-[-0.75%] pb-2 font-bold bg-gradient-to-r from-[#4F5684] via-[#4F5684] to-[#FF8282] bg-clip-text text-transparent">
            { title }
          </h1>
          <p className="text-[1rem] text-primary font-regular mb-9">
            {description}
          </p>
          {children}
        </div>
      </div>
    </div>
  )
}
