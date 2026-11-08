"use client";

import GroupHeader from "./GroupHeader";
import { categoryOrder, type VaultEntry } from "../types";

type Props = {
  entries: VaultEntry[];
};

export default function VaultList({ entries }: Props) {
  return (
    <div id="all" className="space-y-7">
      {categoryOrder.map((type) => {
        const groupEntries = entries.filter((entry) => entry.type === type);
        return (
          <section id={type} key={type}>
            <GroupHeader
              count={groupEntries.length}
              type={type}
            />
          </section>
        );
      })}
    </div>
  );
}
