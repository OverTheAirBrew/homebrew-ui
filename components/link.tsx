import NextLink from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";

interface ILinkProps {
  href: string;
}

const Link: FC<ILinkProps> = ({ href, children }) => {
  const router = useRouter();

  return (
    <NextLink href={href} locale={router.locale}>
      {children}
    </NextLink>
  );
};

export default Link;
