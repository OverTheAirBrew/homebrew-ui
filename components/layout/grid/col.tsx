import { FC } from 'react';

export interface Breakpoint {
  xs?: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

export declare type BreakPointKeys = keyof Breakpoint;

interface IColProps {
  breakPoint?: Partial<Record<BreakPointKeys, number | boolean>>;
  offset?: Partial<Record<BreakPointKeys, number | boolean>>;
  className?: string;
}

const Col: FC<IColProps> = ({ children, breakPoint, className, offset }) => {
  function buildClassNameString() {
    const classNameString: string[] = [];

    if (className) classNameString.push(className);

    if (!breakPoint) {
      classNameString.push(`col`);
    }

    if (breakPoint?.xs) {
      classNameString.push(`col-${breakPoint.xs}`);
    }

    if (breakPoint?.sm) {
      classNameString.push(`col-sm-${breakPoint.sm}`);
    }

    if (breakPoint?.md) {
      classNameString.push(`col-md-${breakPoint.md}`);
    }

    if (breakPoint?.lg) {
      classNameString.push(`col-lg-${breakPoint.lg}`);
    }

    if (breakPoint?.xl) {
      classNameString.push(`col-xl-${breakPoint.xl}`);
    }

    if (offset) {
      if (offset.xs) {
        classNameString.push(`offset-${offset.xs}`);
      }

      if (offset.sm) {
        classNameString.push(`offset-sm-${offset.sm}`);
      }

      if (offset.md) {
        classNameString.push(`offset-md-${offset.md}`);
      }

      if (offset.lg) {
        classNameString.push(`offset-lg-${offset.lg}`);
      }

      if (offset.xl) {
        classNameString.push(`offset-xl-${offset.xl}`);
      }
    }

    return classNameString.join(' ');
  }

  return <div className={buildClassNameString()}>{children}</div>;
};

export default Col;
