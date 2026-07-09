import { profile } from "../content";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-20 mb-10 flex flex-col items-center justify-center gap-1 border-t border-line/70 pt-8 pb-4">
      <p className="text-[15px] text-muted text-center">
        Built and designed by Haardik Sagar.
      </p>
      <p className="text-[15px] text-muted2 text-center">
        All rights reserved. ©
      </p>
    </footer>
  );
}
