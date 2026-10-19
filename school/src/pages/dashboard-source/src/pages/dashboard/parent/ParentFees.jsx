import React from "react";

import { Empty, Panel, Stats, Table } from "../shared/UI";
import { feeStatus } from "../shared/school";

export default function ParentFees({ view }) {
  const { child, fees } = view;

  if (!child) {
    return <Empty>No child is linked to this parent yet.</Empty>;
  }

  return (
    <>
      <Stats
        items={[
          ["Total", "₹" + fees.reduce((n, f) => n + Number(f.total), 0)],
          ["Paid", "₹" + fees.reduce((n, f) => n + Number(f.paid), 0)],
          [
            "Outstanding",
            "₹" +
              fees.reduce(
                (n, f) => n + Math.max(0, Number(f.total) - Number(f.paid)),
                0,
              ),
          ],
        ]}
      />
      <Panel title="Fee records">
        <Table
          headers={["Type", "Session", "Total", "Paid", "Due", "Status"]}
          rows={fees.map((x) => [
            x.type,
            x.session,
            `₹${x.total}`,
            `₹${x.paid}`,
            x.due,
            feeStatus(x),
          ])}
        />
      </Panel>
    </>
  );
}
