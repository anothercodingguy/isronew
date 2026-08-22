import Link from "next/link";

export function Logo() {
  return <Link href="/" aria-label="ISRO home" className="flex items-center gap-3"><img src="/isro-logo.webp" alt="ISRO logo" className="h-12 w-[68px] object-contain object-left" /><span className="hidden text-[10px] font-semibold uppercase leading-4 tracking-[.16em] text-white/90 sm:block">Indian Space Research<br />Organisation <span className="text-white/45">· Department of Space</span></span></Link>;
}
