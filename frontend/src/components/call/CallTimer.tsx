interface Props {

  seconds: number;

}

export function CallTimer({
  seconds
}: Props) {

  const mins =
    Math.floor(
      seconds / 60
    );

  const secs =
    seconds % 60;

  return (

    <div
      className="
        text-5xl
        font-bold
        text-green-400
      "
    >

      {mins}
      :
      {
        secs
          .toString()
          .padStart(2, "0")
      }

    </div>

  );

}