export function Grid({ color, onClick }) {
  return (
    <>
      <div className="grid grid-cols-[repeat(15,_1fr)] grid-rows-[repeat(15,_1fr)] h-full">
        {[...Array(15).keys()].map((x) => (
          <div key={x} className="h-full w-full">
            {[...Array(15).keys()].map((y) => (
              <div
                key={y}
                // onClick={() => {
                //   const newColor = [...color];
                //   newColor[y][x] = "#ffeedd";
                //   setColor(newColor);
                // }}
                onClick={() => onClick(x, y)}
                className="border border-sky-300 h-full"
                style={{ backgroundColor: color[y][x] }}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
