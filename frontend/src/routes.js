import { createBrowserRouter, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/login/Login";
import Menu from "./pages/menu/Menu";
import Register from "./pages/register/Register";
import Patients from "./pages/patients/Patients";
import Novo from "./pages/patients/novo/Novo";
import authService from "./services/authService";
import Exams from "./pages/exams/Exams";
import UserExams from "./pages/exams/patient/UserExams";
import NewExam from "./pages/exams/patient/new-exam/NewExam";
import Consultations from "./pages/consultations/Consultations";
import UserConsultations from "./pages/consultations/patient/UserConsultations";
import NewConsultation from "./pages/consultations/patient/new-consultation/NewConsultation";
import Donations from "./pages/donations/Donations";
import NewDonation from "./pages/donations/new/NewDonation";
import Expenses from "./pages/expenses/Expenses";
import NewExpense from "./pages/expenses/new/NewExpense";
import Transport from "./pages/transport/Transport";
import Vehicles from "./pages/transport/vehicles/Vehicles";
import NewTransport from "./pages/transport/new/NewTransport";
import NewVehicle from "./pages/transport/vehicles/new/NewVehicle";
import EditPatient from "./pages/patients/edit/EditPatient";
import EditExpense from "./pages/expenses/edit/EditExpense";
import EditVehicle from "./pages/transport/vehicles/edit/EditVehicle";
import EditTransport from "./pages/transport/edit/EditTransport";
import FloatingBalanceCard from "./components/FloatingBalanceCard";
import EditDonation from "./pages/donations/edit/EditDonation";
import SectorFunds from "./pages/donations/sectors/SectorFunds";
import NewSector from "./pages/donations/sectors/new/NewSector";
import Employees from "./pages/employees/Employees";
import NewEmployee from "./pages/employees/new/NewEmployee";
import EditEmployee from "./pages/employees/edit/EditEmployee";
import PendingConsultations from "./pages/consultations/pending/PendingConsultations";
import Users from "./pages/users/Users";
import Parametrization from "./pages/parametrization/Parametrization";
import { ParametrizacaoCheck } from "./components/ParametrizacaoCheck";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const isParametrizationRoute = location.pathname.includes('/parametrization');
  const isEditParametrizationRoute = location.pathname === '/parametrization/edit';

  if (isEditParametrizationRoute && !authService.isAdmin()) {
    return <Navigate to="/" replace />;
  }

  if (!authService.isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  return (
    <ParametrizacaoCheck>
      <>
        {children}
        {authService.isAdmin() && !isParametrizationRoute && <FloatingBalanceCard />}
      </>
    </ParametrizacaoCheck>
  );
};

const PublicRoute = ({ children }) => {
  if (authService.isAuthenticated()) {
    return <Navigate to="/menu" replace />;
  }
  return children;
};

const AdminRoute = ({ children }) => {
  if (!authService.isAdmin()) {
    return <Navigate to="/menu" replace />;
  }
  return children;
};

// TODO: editar rotas que só devem ser acessadas por admins
// o element fica, por exemplo se for Login (o primeiro)
// <AdminRoute>
//   <Login />
// </AdminRoute>
export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <Register />
      </PublicRoute>
    ),
  },
  {
    path: "/menu",
    element: (
      <ProtectedRoute>
        <Menu />
      </ProtectedRoute>
    ),
  },
  {
    path: "/patients",
    children: [
      {
        path: "",
        element: (
          <ProtectedRoute>
            <Patients />
          </ProtectedRoute>
        ),
      },
      {
        path: "novo",
        element: (
          <ProtectedRoute>
            <Novo />
          </ProtectedRoute>
        ),
      },
      {
        path: "edit/:id",
        element: (
          <ProtectedRoute>
            <EditPatient />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/exams",
    children: [
      {
        path: "",
        element: (
          <ProtectedRoute>
            <Exams />
          </ProtectedRoute>
        ),
      },
      {
        path: ":userId",
        children: [
          {
            path: "",
            element: (
              <ProtectedRoute>
                <UserExams />
              </ProtectedRoute>
            ),
          },
          {
            path: "novo",
            element: (
              <ProtectedRoute>
                <NewExam />
              </ProtectedRoute>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "/consultations",
    children: [
      {
        path: "",
        element: (
          <ProtectedRoute>
            <Consultations />
          </ProtectedRoute>
        ),
      },
      {
        path: ":userId",
        children: [
          {
            path: "",
            element: (
              <ProtectedRoute>
                <UserConsultations />
              </ProtectedRoute>
            ),
          },
          {
            path: "novo",
            element: (
              <ProtectedRoute>
                <NewConsultation />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "pending",
        element: (
          <ProtectedRoute>
            <PendingConsultations />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/donations",
    children: [
      {
        path: "",
        element: (
          <ProtectedRoute>
            <Donations />
          </ProtectedRoute>
        ),
      },
      {
        path: "new",
        element: (
          <ProtectedRoute>
            <NewDonation />
          </ProtectedRoute>
        ),
      },
      {
        path: "edit/:id",
        element: (
          <ProtectedRoute>
            <EditDonation />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/expenses",
    children: [
      {
        path: "",
        element: (
          <ProtectedRoute>
            <Expenses />
          </ProtectedRoute>
        ),
      },
      {
        path: "new",
        element: (
          <ProtectedRoute>
            <NewExpense />
          </ProtectedRoute>
        ),
      },
      {
        path: "edit/:id",
        element: (
          <ProtectedRoute>
            <EditExpense />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/transport",
    children: [
      {
        path: "",
        element: (
          <ProtectedRoute>
            <Transport />
          </ProtectedRoute>
        ),
      },
      {
        path: "new",
        element: (
          <ProtectedRoute>
            <NewTransport />
          </ProtectedRoute>
        ),
      },
      {
        path: "edit/:id",
        element: (
          <ProtectedRoute>
            <EditTransport />
          </ProtectedRoute>
        ),
      },
      {
        path: "vehicles",
        element: (
          <ProtectedRoute>
            <Vehicles />
          </ProtectedRoute>
        ),
      },
      {
        path: "vehicles/new",
        element: (
          <ProtectedRoute>
            <NewVehicle />
          </ProtectedRoute>
        ),
      },
      {
        path: "vehicles/edit/:id",
        element: (
          <ProtectedRoute>
            <EditVehicle />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/employees",
    children: [
      {
        path: "",
        element: (
          <ProtectedRoute>
            <Employees />
          </ProtectedRoute>
        ),
      },
      {
        path: "new",
        element: (
          <ProtectedRoute>
            <NewEmployee />
          </ProtectedRoute>
        ),
      },
      {
        path: "edit/:id",
        element: (
          <ProtectedRoute>
            <EditEmployee />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/sectors",
    children: [
      {
        path: "",
        element: (
          <ProtectedRoute>
            <SectorFunds />
          </ProtectedRoute>
        ),
      },
      {
        path: "new",
        element: (
          <ProtectedRoute>
            <NewSector />
          </ProtectedRoute>
        ),
      }
    ],
  },
  {
    path: "/users",
    element: (
      <AdminRoute>
        <Users />
      </AdminRoute>
    ),
  },
  {
    path: "/parametrization",
    children: [
      {
        path: "",
        element: (
          <ProtectedRoute>
            <Parametrization />
          </ProtectedRoute>
        ),
      },
    ]
  },
]);
