import { useEffect, useRef, useState } from "react";

export default function useClick(init = false) {
  const [open, setOpen] = useState(init);
  const parentRef = useRef();
  const childRef = useRef();
  const closeRef = useRef();
  useEffect(() => {
    const childNode = childRef.current;
    const parentNode = parentRef.current;
    const closeNode = closeRef.current;
    if (childNode && parentNode) {
      function handleClick(event) {
        if (parentNode.contains(event.target)) setOpen((prev) => !prev);
        else if (
          !childNode.contains(event.target) ||
          (closeNode && closeNode.contains(event.target))
        )
          setOpen(false);
      }
      window.addEventListener("click", handleClick);
      return () => window.removeEventListener("click", handleClick);
    }
  }, [parentRef, childRef, closeRef]);
  return [parentRef, childRef, open, setOpen, closeRef];
}
