import { Heading } from "~/shared/ui/kit/heading";

export default function Page() {
  return (
    <div className="flex flex-col w-full gap-[1.5rem] max-w-content mx-auto px-[1rem]">
      <Heading>Components unavailable</Heading>
      <p className="max-w-[42rem] text-black-60">
        The component playground imports backend and wallet flows, so it is disabled in this static GitHub Pages preview.
      </p>
    </div>
  );
}
