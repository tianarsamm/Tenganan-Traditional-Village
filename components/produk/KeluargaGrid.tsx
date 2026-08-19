import { KeluargaTenun } from "@/types/keluarga";
import KeluargaCard from "./KeluargaCard";

interface KeluargaGridProps {
  keluargaList: KeluargaTenun[];
}

export default function KeluargaGrid({ keluargaList }: KeluargaGridProps) {
  if (keluargaList.length === 0) {
    return (
      <p className="py-16 text-center text-(--color-text-muted)">
        Belum ada keluarga penenun yang tersedia saat ini.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {keluargaList.map((keluarga) => (
        <KeluargaCard key={keluarga.slug} keluarga={keluarga} />
      ))}
    </div>
  );
}