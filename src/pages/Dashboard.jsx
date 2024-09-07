// helper functions
import { useLoaderData } from "react-router-dom";
import { createBudget, fetchData, wait } from "../helpers";

//components
import Intro from "../components/Intro";
import AddBudgetForm from "../components/AddBudgetForm";

//library
import { toast } from "react-toastify";

// loader
export function dashboardLoader() {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  return { userName, budgets };
}

//action
export async function dashboardAction({ request }) {
  await wait();

  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  //new user submission
  if (_action === "newUser") {
    try {
      localStorage.setItem("userName", JSON.stringify(values.userName));
      return toast.success(`Welcome, ${values.userName}`);
    } catch (e) {
      throw new Error(
        "There was a problem creating your account. Please try again."
      );
    }
  }

  if (_action === "createBudget") {
    try {
      //create new budget
      // const budgets = JSON.parse(localStorage.getItem("budgets")) || [];
      // const newBudget = { ...values, id: Date.now() };
      // budgets.push(newBudget);
      // localStorage.setItem("budgets", JSON.stringify(budgets));
      createBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount,
      });
      return toast.success("Budget created!");
    } catch (e) {
      throw new Error(
        "There was a problem creating your budget. Please try again."
      );
    }
  }
}

const Dashboard = () => {
  const { userName, budgets } = useLoaderData();

  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>
            Welcome back, <span className="accent"> {userName}</span>
          </h1>
          <div className="grid-sm">
            {/* { budgets ? () : () }  */}
            <div className="grid-lg">
              <div className="flex-lg">
                <AddBudgetForm />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
};

export default Dashboard;
