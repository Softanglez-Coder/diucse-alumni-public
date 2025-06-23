import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage, PortalDashboardPage, PortalMembershipPage, PortalPage } from "./pages";
import { Layout } from "./layout";

function App() {
  return (
    <Router>
      <Routes>
        {/* Misc */}
        <Route path="/" element={<Layout />} >
          <Route index element={<HomePage />} />
          <Route path="about" element={<HomePage />} />
          <Route path="contact" element={<HomePage />} />

          {/* Memberships */}
          <Route path="membership-requirements" element={<HomePage />} />
          <Route path="membership-benefits" element={<HomePage />} />
          <Route path="membership-process" element={<HomePage />} />

          {/* Members */}
          <Route path="members" element={<HomePage />} />
          <Route path="members/:id" element={<HomePage />} />

          {/* Events */}
          <Route path="events" element={<HomePage />} />
          <Route path="events/:id" element={<HomePage />} />
          <Route path="events/:id/register" element={<HomePage />} />

          {/* Blogs */}
          <Route path="blogs" element={<HomePage />} />
          <Route path="blogs/:id" element={<HomePage />} />

          {/* Notices */}
          <Route path="notices" element={<HomePage />} />
          <Route path="notices/:id" element={<HomePage />} />

          {/* News */}
          <Route path="news" element={<HomePage />} />
          <Route path="news/:id" element={<HomePage />} />

          {/* Payments */}
          <Route path="payments/:invoiceId" element={<HomePage />} />
          <Route path="payments/success" element={<HomePage />} />
          <Route path="payments/fail" element={<HomePage />} />

          {/* Auth */}
          <Route path="login" element={<HomePage />} />
          <Route path="register" element={<HomePage />} />
          <Route path="forgot-password" element={<HomePage />} />
          <Route path="reset-password" element={<HomePage />} />
          <Route path="verify-email" element={<HomePage />} />

          {/* Portal */}
          <Route path="portal" element={<PortalPage />}>
            <Route index element={<PortalDashboardPage />} />
            <Route path="dashboard" element={<PortalDashboardPage />} />
            <Route path="membership" element={<PortalMembershipPage />} />
            <Route path="profile" element={<PortalDashboardPage />} />
            <Route path="events" element={<PortalDashboardPage />} />
            <Route path="blogs" element={<PortalDashboardPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
