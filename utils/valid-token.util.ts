import { API_URL } from '@/shared/constant/api-url';
import { REFRESH_TOKEN_NAME } from '@/shared/constant/cookie';

interface Props {
  tkn: string | undefined;
  rtkn: string | undefined;
}

export const ValidToken = async (props: Props) => {
  const { tkn, rtkn } = props;

  if (!rtkn) {
    return null;
  }

  try {
    if (!tkn) {
      const response = await fetch(`${API_URL}/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          cookie: `${REFRESH_TOKEN_NAME}=${rtkn}`,
        },
      });

      if (!response.ok) {
        return null;
      }

      const data = await response.json();

      if (!data) {
        return null;
      }

      const { tkn } = data;

      return tkn;
    }

    return tkn;
  } catch (error) {
    return null;
  }
};
