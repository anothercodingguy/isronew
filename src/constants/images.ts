export const isroImages = {
  lvm3Liftoff: "/images/lvm3-liftoff.jpg",
  gaganyaanTvD1Launch: "/images/gaganyaan-tvd1.webp",
  gaganyaanCrewModule: "/images/gaganyaan-crew-module.jpg",
  chandrayaan3VikramLander: "/images/chandrayaan3-vikram.jpg",
  adityaL1Launch: "/images/aditya-l1.jpg"
} as const;

export type IsroImageKey = keyof typeof isroImages;
