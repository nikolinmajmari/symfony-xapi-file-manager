import { SnapshotHeader } from "../components/snapshot/SnapshotHeader";
import { SearchField } from "../components/form/SearchField";
import { AsideFMHeader } from "../components/fm/AsideFmHeader";
import FMSnapshotContainer from "../features/snapshot/FMSnapshotContainer";

export default function Master() {
  return (
    <div className="app p-8 bg-white m-12 flex flex-1 rounded-2xl flex-col items-stretch relative">
      <div className="flex flex-row flex-wrap items-start justify-between">
        <SearchField />
        <AsideFMHeader />
      </div>
      <SnapshotHeader />
      <FMSnapshotContainer />
    </div>
  );
}
