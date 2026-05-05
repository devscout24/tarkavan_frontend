type Position = {
  id: number;
  name: string;
};

export function sortPositions(data: Position[]): Position[] {
  const orderMap: Record<string, number> = {
    GK: 0,
    CB: 1,
    RB: 2,
    LB: 3,
    DM: 4,
    CM: 5,
    AM: 6,
    RW: 7,
    LW: 8,
    ST: 9,
  };

  return data.sort((a, b) => {
    const aKey = a.name.match(/\((.*?)\)/)?.[1] || "";
    const bKey = b.name.match(/\((.*?)\)/)?.[1] || "";

    return (orderMap[aKey] ?? Infinity) - (orderMap[bKey] ?? Infinity);
  });
}