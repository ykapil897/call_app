interface Props {

  muted: boolean;

  onMute: () => void;

  onHangup: () => void;

}

export function CallControls({
  muted,
  onMute,
  onHangup
}: Props) {

  return (

    <div
      className="
        flex
        gap-6
        justify-center
      "
    >

      <button

        onClick={onMute}

        className="
          px-8
          py-3
          rounded-2xl
          bg-yellow-600
          hover:bg-yellow-500
          hover:scale-105
          transition
        "
      >

        {
          muted
            ? "Unmute"
            : "Mute"
        }

      </button>

      <button

        onClick={onHangup}

        className="
          px-8
          py-3
          rounded-2xl
          bg-red-600
          hover:bg-red-500
          hover:scale-105
          transition
        "
      >

        Hang Up

      </button>

    </div>

  );

}