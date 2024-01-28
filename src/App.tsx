// App.js

import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LoginPage from './app/(auth)/login/page';
import AdminDashboardPage from './app/(home)/(dashboards)/admin-dashboard/page';
import CEODashboardPage from './app/(home)/(dashboards)/ceo-dashboard/page';
import MarketingDashboardPage from './app/(home)/(dashboards)/marketing-dashboard/page';
import SalesDashboardPage from './app/(home)/(dashboards)/sales-dashboard/page';
import TechDashboardPage from './app/(home)/(dashboards)/tech-dashboard/page';
import AddAdPage from './app/(home)/ads/add/page';
import AdsPage from './app/(home)/ads/page';
import AddAdvertiserPage from './app/(home)/advertisers/add/page';
import AdvertisersPage from './app/(home)/advertisers/page';
import AddAppointmentPage from './app/(home)/appointments/add/page';
import AppointmentsPage from './app/(home)/appointments/page';
import AuditLogsPage from './app/(home)/audit-logs/page';
import BrandsPage from './app/(home)/brands/(list)/page';
import BrandPage from './app/(home)/brands/[brand]/(view)/page';
import EditBrandPage from './app/(home)/brands/[brand]/edit/page';
import AddBrandPage from './app/(home)/brands/add/page';
import AddCallPage from './app/(home)/calls/add/page';
import CallsPage from './app/(home)/calls/page';
import CategoriesPage from './app/(home)/categories/(list)/page';
import CategoryPage from './app/(home)/categories/[category]/(view)/page';
import AttributePage from './app/(home)/categories/[category]/attributes/[attribute]/(view)/page';
import EditAttributePage from './app/(home)/categories/[category]/attributes/[attribute]/edit/page';
import AttributeValuePage from './app/(home)/categories/[category]/attributes/[attribute]/values/[value]/(view)/page';
import EditAttributeValuePage from './app/(home)/categories/[category]/attributes/[attribute]/values/[value]/edit/page';
import AddAttributeValuePage from './app/(home)/categories/[category]/attributes/[attribute]/values/add/page';
import AddAttributePage from './app/(home)/categories/[category]/attributes/add/page';
import EditCategoryPage from './app/(home)/categories/[category]/edit/page';
import AddCategoryPage from './app/(home)/categories/add/page';
import AddClaimTypePage from './app/(home)/claim-types/add/page';
import ClaimTypesPage from './app/(home)/claim-types/page';
import CountriesPage from './app/(home)/countries/(list)/page';
import CountryPage from './app/(home)/countries/[country]/(view)/page';
import EditCountryPage from './app/(home)/countries/[country]/edit/page';
import LocationPage from './app/(home)/countries/[country]/locations/[location]/(view)/page';
import EditLocationPage from './app/(home)/countries/[country]/locations/[location]/edit/page';
import AddLocationPage from './app/(home)/countries/[country]/locations/add/page';
import AddCountryPage from './app/(home)/countries/add/page';
import CurrenciesPage from './app/(home)/currencies/(list)/page';
import CurrencyPage from './app/(home)/currencies/[currency]/(view)/page';
import EditCurrencyPage from './app/(home)/currencies/[currency]/edit/page';
import AddCurrencyPage from './app/(home)/currencies/add/page';
import AddCustomerPage from './app/(home)/customers/add/page';
import CustomersPage from './app/(home)/customers/page';
import AddHighlightPage from './app/(home)/highlights/add/page';
import HighlightsPage from './app/(home)/highlights/page';
import AddInternalNotePage from './app/(home)/internal-notes/add/page';
import InternalNotesPage from './app/(home)/internal-notes/page';
import AddInventoryItemPage from './app/(home)/inventory/add/page';
import InventoryPage from './app/(home)/inventory/page';
import AddLanguageTextPage from './app/(home)/language-texts/add/page';
import LanguageTextsPage from './app/(home)/language-texts/page';
import AddLanguagePage from './app/(home)/languages/add/page';
import LanguagesPage from './app/(home)/languages/page';
import AddLeadPage from './app/(home)/leads/add/page';
import LeadsPage from './app/(home)/leads/page';
import AddMerchantPage from './app/(home)/merchants/add/page';
import MerchantsPage from './app/(home)/merchants/page';
import NotificationsPage from './app/(home)/notifications/page';
import SendNotificationPage from './app/(home)/notifications/send/page';
import UnitsPage from './app/(home)/organization-units/page';
import ProductsPage from './app/(home)/products/(list)/page';
import AddProductPage from './app/(home)/products/add/page';
import DeletedProductsPage from './app/(home)/products/deleted/page';
import ProfilePage from './app/(home)/profile/(view)/page';
import EditProfilePage from './app/(home)/profile/edit/page';
import AddRequestPage from './app/(home)/requests/add/page';
import RequestsPage from './app/(home)/requests/page';
import RolesPage from './app/(home)/roles/(list)/page';
import RolePage from './app/(home)/roles/[role]/(view)/page';
import EditRolePage from './app/(home)/roles/[role]/edit/page';
import AddRolePage from './app/(home)/roles/add/page';
import SecurityLogsPage from './app/(home)/security-logs/page';
import SettingsPage from './app/(home)/settings/page';
import AddSubscriptionPage from './app/(home)/subscriptions/add/page';
import SubscriptionsPage from './app/(home)/subscriptions/page';
import TagsPage from './app/(home)/tags/(list)/page';
import TagPage from './app/(home)/tags/[tag]/(view)/page';
import EditTagPage from './app/(home)/tags/[tag]/edit/page';
import AddTagPage from './app/(home)/tags/add/page';
import AddTextTemplatePage from './app/(home)/text-templates/add/page';
import TextTemplatesPage from './app/(home)/text-templates/page';
import TopicsPage from './app/(home)/topics/(list)/page';
import TopicPage from './app/(home)/topics/[topic]/(view)/page';
import EditTopicPage from './app/(home)/topics/[topic]/edit/page';
import AddTopicPage from './app/(home)/topics/add/page';
import UsersPage from './app/(home)/users/(list)/page';
import UserPage from './app/(home)/users/[user]/(view)/page';
import EditUserPage from './app/(home)/users/[user]/edit/page';
import AddUserPage from './app/(home)/users/add/page';
import WishlistsPage from './app/(home)/wishlists/page';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Default Routes */}
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />
        <Route
          path="/login"
          element={<LoginPage />}
        />

        {/* Dashboard Pages */}
        <Route
          path="/ceo-dashboard"
          element={<CEODashboardPage />}
        />
        <Route
          path="/sales-dashboard"
          element={<SalesDashboardPage />}
        />
        <Route
          path="/marketing-dashboard"
          element={<MarketingDashboardPage />}
        />
        <Route
          path="/tech-dashboard"
          element={<TechDashboardPage />}
        />
        <Route
          path="/admin-dashboard"
          element={<AdminDashboardPage />}
        />

        {/* Other Pages */}
        <Route
          path="/ads"
          element={<AdsPage />}
        />
        <Route
          path="/ads/add"
          element={<AddAdPage />}
        />

        <Route
          path="/advertisers"
          element={<AdvertisersPage />}
        />
        <Route
          path="/advertisers/add"
          element={<AddAdvertiserPage />}
        />

        <Route
          path="/appointments"
          element={<AppointmentsPage />}
        />
        <Route
          path="/appointments/add"
          element={<AddAppointmentPage />}
        />

        <Route
          path="/audit-logs"
          element={<AuditLogsPage />}
        />

        <Route
          path="/brands"
          element={<BrandsPage />}
        />
        <Route
          path="/brands/add"
          element={<AddBrandPage />}
        />
        <Route
          path="/brands/:brandID"
          element={<BrandPage />}
        />
        <Route
          path="/brands/:brandID/edit"
          element={<EditBrandPage />}
        />

        <Route
          path="/calls"
          element={<CallsPage />}
        />
        <Route
          path="/calls/add"
          element={<AddCallPage />}
        />

        <Route
          path="/categories"
          element={<CategoriesPage />}
        />
        <Route
          path="/categories/add"
          element={<AddCategoryPage />}
        />
        <Route
          path="/categories/:categoryID"
          element={<CategoryPage />}
        />
        <Route
          path="/categories/:categoryID/edit"
          element={<EditCategoryPage />}
        />
        <Route
          path="/categories/:categoryID/attributes/add"
          element={<AddAttributePage />}
        />
        <Route
          path="/categories/:categoryID/attributes/:attributeID"
          element={<AttributePage />}
        />
        <Route
          path="/categories/:categoryID/attributes/:attributeID/edit"
          element={<EditAttributePage />}
        />
        <Route
          path="/categories/:categoryID/attributes/:attributeID/values/add"
          element={<AddAttributeValuePage />}
        />
        <Route
          path="/categories/:categoryID/attributes/:attributeID/values/:valueID"
          element={<AttributeValuePage />}
        />
        <Route
          path="/categories/:categoryID/attributes/:attributeID/values/:valueID/edit"
          element={<EditAttributeValuePage />}
        />

        <Route
          path="/claim-types"
          element={<ClaimTypesPage />}
        />
        <Route
          path="/claim-types/add"
          element={<AddClaimTypePage />}
        />

        <Route
          path="/countries"
          element={<CountriesPage />}
        />
        <Route
          path="/countries/add"
          element={<AddCountryPage />}
        />
        <Route
          path="/countries/:countryID"
          element={<CountryPage />}
        />
        <Route
          path="/countries/:countryID/edit"
          element={<EditCountryPage />}
        />
        <Route
          path="/countries/:countryID/locations/add"
          element={<AddLocationPage />}
        />
        <Route
          path="/countries/:countryID/locations/:locationID"
          element={<LocationPage />}
        />
        <Route
          path="/countries/:countryID/locations/:locationID/edit"
          element={<EditLocationPage />}
        />

        <Route
          path="/currencies"
          element={<CurrenciesPage />}
        />
        <Route
          path="/currencies/add"
          element={<AddCurrencyPage />}
        />
        <Route
          path="/currencies/:currencyID"
          element={<CurrencyPage />}
        />
        <Route
          path="/currencies/:currencyID/edit"
          element={<EditCurrencyPage />}
        />

        <Route
          path="/customers"
          element={<CustomersPage />}
        />
        <Route
          path="/customers/add"
          element={<AddCustomerPage />}
        />

        <Route
          path="/highlights"
          element={<HighlightsPage />}
        />
        <Route
          path="/highlights/add"
          element={<AddHighlightPage />}
        />

        <Route
          path="/internal-notes"
          element={<InternalNotesPage />}
        />
        <Route
          path="/internal-notes/add"
          element={<AddInternalNotePage />}
        />

        <Route
          path="/inventory"
          element={<InventoryPage />}
        />
        <Route
          path="/inventory/add"
          element={<AddInventoryItemPage />}
        />

        <Route
          path="/language-texts"
          element={<LanguageTextsPage />}
        />
        <Route
          path="/language-texts/add"
          element={<AddLanguageTextPage />}
        />

        <Route
          path="/languages"
          element={<LanguagesPage />}
        />
        <Route
          path="/languages/add"
          element={<AddLanguagePage />}
        />

        <Route
          path="/leads"
          element={<LeadsPage />}
        />
        <Route
          path="/leads/add"
          element={<AddLeadPage />}
        />

        <Route
          path="/merchants"
          element={<MerchantsPage />}
        />
        <Route
          path="/merchants/add"
          element={<AddMerchantPage />}
        />

        <Route
          path="/notifications"
          element={<NotificationsPage />}
        />
        <Route
          path="/notifications/send"
          element={<SendNotificationPage />}
        />

        <Route
          path="/organization-units"
          element={<UnitsPage />}
        />

        <Route
          path="/products"
          element={<ProductsPage />}
        />
        <Route
          path="/products/add"
          element={<AddProductPage />}
        />
        <Route
          path="/products/deleted"
          element={<DeletedProductsPage />}
        />

        <Route
          path="/profile"
          element={<ProfilePage />}
        />
        <Route
          path="/profile/edit"
          element={<EditProfilePage />}
        />

        <Route
          path="/requests"
          element={<RequestsPage />}
        />
        <Route
          path="/requests/add"
          element={<AddRequestPage />}
        />

        <Route
          path="/roles"
          element={<RolesPage />}
        />
        <Route
          path="/roles/add"
          element={<AddRolePage />}
        />
        <Route
          path="/roles/:roleID"
          element={<RolePage />}
        />
        <Route
          path="/roles/:roleID/edit"
          element={<EditRolePage />}
        />

        <Route
          path="/security-logs"
          element={<SecurityLogsPage />}
        />

        <Route
          path="/settings"
          element={<SettingsPage />}
        />

        <Route
          path="/subscriptions"
          element={<SubscriptionsPage />}
        />
        <Route
          path="/subscriptions/add"
          element={<AddSubscriptionPage />}
        />

        <Route
          path="/tags"
          element={<TagsPage />}
        />
        <Route
          path="/tags/add"
          element={<AddTagPage />}
        />
        <Route
          path="/tags/:tagID"
          element={<TagPage />}
        />
        <Route
          path="/tags/:tagID/edit"
          element={<EditTagPage />}
        />

        <Route
          path="/text-templates"
          element={<TextTemplatesPage />}
        />
        <Route
          path="/text-templates/add"
          element={<AddTextTemplatePage />}
        />

        <Route
          path="/topics"
          element={<TopicsPage />}
        />
        <Route
          path="/topics/add"
          element={<AddTopicPage />}
        />
        <Route
          path="/topics/:topicID"
          element={<TopicPage />}
        />
        <Route
          path="/topics/:topicID/edit"
          element={<EditTopicPage />}
        />

        <Route
          path="/users"
          element={<UsersPage />}
        />
        <Route
          path="/users/add"
          element={<AddUserPage />}
        />
        <Route
          path="/users/:userID"
          element={<UserPage />}
        />
        <Route
          path="/users/:userID/edit"
          element={<EditUserPage />}
        />

        <Route
          path="/wishlists"
          element={<WishlistsPage />}
        />
      </Routes>
    </Router>
  );
};

export default App;