import Axios from 'axios';

const apiUrl = process.env.API_URL;

interface BudgetDetails {
  amount: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
}

export const newBudgetRequest = async (
  budgetDetails: BudgetDetails,
  token: string,
): Promise<any> => {
  const url = `${apiUrl}/budgets`;

  try {
    const response = await Axios.post(url, budgetDetails, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    return error.response.data;
  }
};
