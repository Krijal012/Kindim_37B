import { useSearchParams } from "react-router-dom";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  return (
    <div>
      <h2>Reset Password Page</h2>
      
    </div>
  );
};

export default ResetPassword;
