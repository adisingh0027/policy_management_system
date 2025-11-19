interface Props {
  message: string;
  retry?: () => void;
}

export const ErrorState = ({ message, retry }: Props) => (
  <div className="error">
    <p>{message}</p>
    {retry && (
      <button type="button" onClick={retry}>
        Retry
      </button>
    )}
  </div>
);
