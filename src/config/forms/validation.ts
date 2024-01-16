import * as yup from 'yup';

// Add Test To All Arrays Validation After Integration
/*
  .required('Please Select')
  .test({
    test: arr => arr.length !== 0
  }),
*/

export class AdValidation {
  static mainSchema = yup.object().shape({
    advertiser: yup
      .string()
      .required('Please Select The Advertiser'),
    title: yup
      .string()
      .required('Please Enter Ad Name')
      .typeError('Please Enter a Valid Ad Name'),
    description: yup
      .string()
      .required('Please Enter Ad Description')
      .typeError('Please Enter a Valid Ad Description'),
    link: yup
      .string()
      .required('Please Enter Ad Link')
      .typeError('Please Enter a Valid Link'),
    linkTitle: yup
      .string()
      .required('Please Enter Ad Link Title')
      .typeError('Please Enter a Valid Link Title'),
    adImage: yup
      .object()
      .required('Please Select Ad. Image')
      .typeError('Please Select Ad. Image'),
    isVisible: yup
      .bool()
      .required(),
    isExclusive: yup
      .bool()
      .required(),
    slug: yup
      .string()
      .required('Please Enter Slug'),
  });
}

export class AdvertiserValidation {
  static mainSchema = yup.object().shape({
    name: yup
      .string()
      .required('Please Enter Advertiser Name'),
    logo: yup
      .object()
      .required('Please Select Advertiser Logo')
      .typeError('Please Select Advertiser Logo'),
    slug: yup
      .string()
      .required('Please Enter Slug'),
  });
}

export class AppointmentValidation {
  static mainSchema = yup.object().shape({
    customer: yup
      .string()
      .required('Please Select The Customer'),
    item: yup
      .string()
      .required('Please Select The Product'),
    assignedTo: yup
      .string()
      .required('Please Select'),
    date: yup
      .string()
      .required('Please Select The Date'),
    slot: yup
      .string()
      .required('Please Select The Slot'),
    status: yup
      .string()
      .required('Please Select The Status'),
  });
}

export class BrandValidation {
  static mainSchema = yup.object().shape({
    name: yup
      .string()
      .required('Please Enter Brand Name'),
    categoryIds: yup
      .array()
      .min(1, "Please Select Categories")
      .required("Please Select Categories"),
    shortDescription: yup
      .string()
      .required('Please Enter Short Description'),
    description: yup
      .string()
      .required('Please Enter Description'),
    slug: yup
      .string()
      .required('Please Enter Slug'),
    allowedInSearch: yup
      .bool()
      .required('Please Select'),
    allowedInFilters: yup
      .bool()
      .required('Please Select'),
    showOnHomePage: yup
      .bool()
      .required('Please Select'),
    isPublished: yup
      .bool()
      .required('Please Select'),
  });
}

export class CallValidation {
  static mainSchema = yup.object().shape({
    customer: yup
      .string()
      .required('Please Select The Customer'),
    product: yup
      .string()
      .required('Please Select The Product'),
    assignedTo: yup
      .string()
      .required('Please Select'),
    date: yup
      .string()
      .required('Please Select The Date'),
    status: yup
      .string()
      .required('Please Select The Status'),
    notes: yup.string()
  });
}

export class CategoryValidation {
  static mainSchema = yup.object().shape({
    name: yup
      .string()
      .required('Please Enter Category Name'),
    orderNo: yup
      .number()
      .min(0, 'Please Enter a Valid Order Number')
      .required('Please Enter Order Number'),
    parentCategoryId: yup
      .number(),
    active: yup
      .bool(),
  });
}

export class AttributeValidation {
  static mainSchema = yup.object().shape({
    name: yup
      .string()
      .required('Please Enter Attribute Name'),
    type: yup
      .string()
      .required('Please Select Attribute Type'),
    isRequired: yup
      .bool()
      .required(),
    allowFiltering: yup
      .bool()
      .required(),
    showOnProductPage: yup
      .bool()
      .required(),
    displayOrder: yup
      .number()
      .min(0, 'Please Enter a Valid Order Number')
      .typeError('Please Enter a Valid Number')
      .required('Please Enter Order Number'),
    categoryId: yup
      .number(),
  });
}

export class AttributeValueValidation {
  static mainSchema = yup.object().shape({
    value: yup
      .string()
      .required('Please Enter a Value'),
  });
}

export class ClaimTypeValidation {
  static mainSchema = yup.object().shape({
    name: yup
      .string()
      .required('Please Enter Claim Type Name'),
    type: yup
      .string()
      .required('Please Enter Value Type'),
    description: yup
      .string()
      .required('Please Enter Description'),
    regex: yup
      .string()
      .required('Please Enter Regex'),
    isRequired: yup
      .bool()
      .required('Please Select'),
    isStatic: yup
      .bool()
      .required('Please Select'),
  });
}

export class CountryValidation {
  static mainSchema = yup.object().shape({
    name: yup
      .string()
      .required('Please Enter Country Name'),
    code: yup
      .string()
      .required('Please Enter Country Code'),
    isoCode: yup
      .string()
      .required('Please Enter Country ISO Code'),
    isActive: yup
      .bool()
      .required(),
    comingSoon: yup
      .bool()
      .required(),
    isInMaintenanceMode: yup
      .bool()
      .required(),
  });
}

export class CurrencyValidation {
  static mainSchema = yup.object().shape({
    name: yup
      .string()
      .required('Please Enter Currency Name'),
    isoCode: yup
      .string()
      .required('Please Enter ISO Code')
      .max(3, 'ISO Code must be at most 3 characters'),
  });
}

export class CustomerValidation {
  static mainSchema = yup.object().shape({
    name: yup
      .string()
      .required('Please Enter Customer Name'),
    mobile: yup
      .string()
      .required('Please Enter Customer Mobile Number')
      .min(10, 'Please Enter a Valid Mobile Number'),
    email: yup
      .string()
      .email('Please Enter a Valid Email')
      .required('Please Enter Customer Email'),
    birthdate: yup
      .string()
      .required('Please Select Customer Birthdate'),
    gender: yup
      .string()
      .required('Please Select Customer Gender'),
    country: yup
      .string()
      .required('Please Select Customer Country'),
    address: yup
      .string()
      .required('Please Enter Customer Address'),
    customerType: yup
      .string()
      .required('Please Select Customer Type'),
    occupation: yup
      .string()
      .required('Please Enter Customer Occupation'),
    company: yup
      .string()
      .required('Please Enter Customer Company'),
    interests: yup
      .array(),
  });
}

export class HighlightValidation {
  static mainSchema = yup.object().shape({
    product: yup
      .string() // TODO: Change To Object While Integrating With Backend
      .required('Please Select The Product')
      .typeError('Please Select The Product')
  });
}

export class InternalNoteValidation {
  static mainSchema = yup.object().shape({
    customer: yup
      .string()
      .required('Please Select The Customer')
      .typeError('Please Select The Customer'),
    product: yup
      .string()
      .required('Please Select The Product')
      .typeError('Please Select The Product'),
    title: yup
      .string()
      .required('Please Enter The Title'),
    description: yup
      .string()
      .required('Please Enter The Description'),
  });
}

export class InventoryProductValidation {
  static mainSchema = yup.object().shape({
    name: yup
      .string()
      .required('Please Enter Product Name'),
    description: yup
      .string()
      .required('Please Enter Description'),
    brand: yup
      .string()
      .required('Please Select Product Brand'),
    category: yup
      .string()
      .required('Please Select Product Category'),
    status: yup
      .string()
      .required('Please Select Product Status'),
    images: yup
      .array(),
    enableShowPrice: yup
      .bool()
      .required('Please Select Enable Show Price'),
    price: yup.number()
      .when("enableShowPrice", {
        is: true,
        then: () => yup
          .number()
          .min(1, 'Please Enter a Valid Price')
          .required('Please Enter Price'),
      }),
    currency: yup
      .string()
      .when("enableShowPrice", {
        is: true,
        then: () => yup
          .string()
          .required('Please Select Currency'),
      }),
    showPriceLabel: yup
      .string()
      .when("enableShowPrice", {
        is: false,
        then: () => yup
          .string()
          .required('Please Enter Show Price Label'),
      }),
    location: yup
      .string()
      .required('Please Select Location'),
    latitude: yup
      .string()
      .required('Please Enter Latitude'),
    longitude: yup
      .string()
      .required('Please Enter Longitude'),
    attributes: yup
      .array(),
    country: yup
      .string()
      .required('Please Select Country'),
    tags: yup
      .array(),
    pinnedIndex: yup
      .number(),
    categoryIndex: yup
      .number(),
    isSummerProduct: yup
      .bool(),
    isRequestVIP: yup
      .bool(),
    isSponsored: yup
      .bool(),
    metaTitle: yup
      .string()
      .required('Please Enter Meta Title'),
    metaDescription: yup
      .string()
      .required('Please Enter Meta Description'),
    metaKeywords: yup
      .string()
      .required('Please Enter Meta Keywords'),
    slug: yup
      .string()
      .required('Please Enter Slug'),
  });
}

export class LanguageTextValidation {
  static mainSchema = yup.object().shape({
    key: yup
      .string()
      .required('Please Enter The Key'),
    baseValue: yup
      .string()
      .required('Please Enter The Base Value'),
    value: yup
      .string()
      .required('Please Enter The Value'),
    resourceName: yup
      .string()
      .required('Please Enter The Resource Name'),
  });
}

export class LanguagesValidation {
  static mainSchema = yup.object().shape({
    displayName: yup
      .string()
      .required('Please Enter The Display Name'),
    cultureName: yup
      .string()
      .required('Please Enter The Culture Name'),
    uiCultureName: yup
      .string()
      .required('Please Enter The UI Culture Name'),
    isEnabled: yup
      .bool()
      .required('Please Select The If It Is Enabled Or Not'),
  });
}

export class LeadValidation {
  static mainSchema = yup.object().shape({
    name: yup
      .string()
      .required('Please Enter The Lead Name'),
    mobile: yup
      .string()
      .required('Please Enter Lead Mobile Number')
      .min(10, 'Please Enter a Valid Mobile Number'),
    email: yup
      .string()
      .email('Please Enter a Valid Email')
      .required('Please Enter Lead Email'),
    interests: yup
      .array()
      .required('Please Select The Interests')
      .test({
        test: arr => arr.length !== 0
      }),
    status: yup
      .string()
      .required('Please Select The Status'),
    rating: yup
      .string()
      .required('Please Select The Rating'),
    priority: yup
      .string()
      .required('Please Select The Priority'),
    notes: yup
      .string(),
    assignedTo: yup
      .string()
      .required('Please Select'),
  });
}

export class LocationValidation {
  static mainSchema = yup.object().shape({
    countryId: yup.number(),
    name: yup
      .string()
      .required('Please Enter Location Name'),
    isIncludedInApp: yup
      .bool(),
  });
}

export class MerchantValidation {
  static mainSchema = yup.object().shape({
    name: yup
      .string()
      .required('Please Enter Merchant Name'),
    email: yup
      .string()
      .email('Please Enter a Valid Email')
      .required('Please Enter Merchant Email'),
    category: yup
      .string()
      .required('Please Select Merchant Category'),
    contactName: yup
      .string()
      .required('Please Enter Merchant Contact Name'),
    contactNumber: yup
      .string()
      .required('Please Enter Merchant Contact Number'),
    location: yup
      .string()
      .required('Please Enter Merchant Location'),
    website: yup
      .string()
      .required('Please Enter Merchant Website'),
    agreement: yup
      .object()
      .required('Please Select a Valid File')
      .typeError('Please Select a Valid File'),
  });
}

export class NotificationValidation {
  static mainSchema = yup.object().shape({
    title: yup
      .string()
      .required('Please Enter Notification Title'),
    description: yup
      .string()
      .required('Please Enter Notification Description'),
    navigateTo: yup
      .string()
      .required('Please Select'),
    receiver: yup
      .string()
      .required('Please Select The Receiver'),
  });
}

export class ProductValidation {
  static mainSchema = yup.object().shape({
    name: yup
      .string()
      .required('Please Enter Product Name'),
    description: yup
      .string()
      .required('Please Enter Description'),
    brand: yup
      .string()
      .required('Please Select Product Brand'),
    category: yup
      .string()
      .required('Please Select Product Category'),
    owner: yup
      .string()
      .required('Please Select Product Owner'),
    status: yup
      .string()
      .required('Please Select Product Status'),
    images: yup
      .array(),
    enableShowPrice: yup
      .bool()
      .required('Please Select Enable Show Price'),
    price: yup.number()
      .when("enableShowPrice", {
        is: true,
        then: () => yup
          .number()
          .min(1, 'Please Enter a Valid Price')
          .required('Please Enter Price'),
      }),
    currency: yup
      .string()
      .when("enableShowPrice", {
        is: true,
        then: () => yup
          .string()
          .required('Please Select Currency'),
      }),
    showPriceLabel: yup
      .string()
      .when("enableShowPrice", {
        is: false,
        then: () => yup
          .string()
          .required('Please Enter Show Price Label'),
      }),
    location: yup
      .string()
      .required('Please Select Location'),
    latitude: yup
      .string()
      .required('Please Enter Latitude'),
    longitude: yup
      .string()
      .required('Please Enter Longitude'),
    attributes: yup
      .array(),
    country: yup
      .string()
      .required('Please Select Country'),
    tags: yup
      .array(),
    pinnedIndex: yup
      .number(),
    categoryIndex: yup
      .number(),
    isSummerProduct: yup
      .bool(),
    isRequestCamera: yup
      .bool(),
    isRequestPricing: yup
      .bool(),
    isRequestVIP: yup
      .bool(),
    isSponsored: yup
      .bool(),
    metaTitle: yup
      .string()
      .required('Please Enter Meta Title'),
    metaDescription: yup
      .string()
      .required('Please Enter Meta Description'),
    metaKeywords: yup
      .string()
      .required('Please Enter Meta Keywords'),
    slug: yup
      .string()
      .required('Please Enter Slug'),
  });
}

export class RequestValidation {
  static mainSchema = yup.object().shape({
    requestor: yup
      .string()
      .required('Please Select Requestor'),
    product: yup
      .string()
      .required('Please Select Product'),
    assignedTo: yup
      .string()
      .required('Please Select'),
    appointment: yup
      .string()
      .required('Please Select The Appointment Details'),
    status: yup
      .string()
      .required('Please Enter Status'),
    notes: yup
      .string()
      .required('Please Enter Notes'),
  });
}

export class RoleValidation {
  static mainSchema = yup.object().shape({
    name: yup
      .string()
      .required('Please Enter Role Name'),
    isDefault: yup
      .bool()
      .required(),
    isPublic: yup
      .bool()
      .required(),
  });
}

export class UserValidation {
  static mainSchema = yup.object().shape({
    name: yup
      .string()
      .required('Please Enter Name'),
    surname: yup
      .string()
      .required('Please Enter Surname'),
    userName: yup
      .string()
      .required('Please Enter User Name'),
    email: yup
      .string()
      .email('Please Enter a Valid Email')
      .required('Please Enter Email'),
    phoneNumber: yup
      .string()
      .required('Please Enter Phone Number')
      .min(10, 'Please Enter a Valid Phone Number'),
    password: yup
      .string()
      .required('Please Enter Password'),
    isActive: yup
      .bool()
      .required(),
    lockoutEnabled: yup
      .bool()
      .required(),
    roleNames: yup
      .array()
      .min(1, "Please Select User Roles")
      .required("Please Select User Roles"),
  });
}

export class ProfileValidation {
  static mainSchema = yup.object().shape({
    name: yup
      .string()
      .required('Please Enter Name'),
    surname: yup
      .string()
      .required('Please Enter Surname'),
    userName: yup
      .string()
      .required('Please Enter User Name'),
    email: yup
      .string()
      .email('Please Enter a Valid Email')
      .required('Please Enter Email'),
    phoneNumber: yup
      .string()
      .required('Please Enter Phone Number')
      .min(10, 'Please Enter a Valid Phone Number'),
  });
}

export class ChangePasswordValidation {
  static mainSchema = yup.object().shape({
    currentPassword: yup.string()
      .required('Current password is required'),

    newPassword: yup.string()
      .required('New password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).*$/,
        'Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character'
      ),

    confirmNewPassword: yup.string()
      .oneOf([yup.ref('newPassword'), undefined], 'Passwords must match')
      .required('Confirm new password is required'),
  });
}

export class SubscriptionValidation {
  static mainSchema = yup.object().shape({
    customer: yup
      .string()
      .required('Please Select Customer'),
    type: yup
      .string()
      .required('Please Select Subscription Type'),
    from: yup
      .string()
      .required('Please Select Subscription Start Date'),
    to: yup
      .string()
      .required('Please Select Subscription End Date'),
    isRefundAllowed: yup
      .bool(),
    isActive: yup
      .bool(),
    isRefunded: yup
      .bool(),
    slug: yup
      .string()
      .required('Please Enter Slug'),
  });
}

export class TagValidation {
  static mainSchema = yup.object().shape({
    key: yup
      .string()
      .required('Please Enter Tag Key'),
    displayName: yup
      .string()
      .required('Please Enter Tag Display Name'),
    description: yup
      .string()
      .required('Please Enter Tag Description'),
  });
}

export class TextTemplateValidation {
  static mainSchema = yup.object().shape({
    name: yup
      .string()
      .required('Please Enter Template Name'),
    isInlineLocalized: yup
      .bool(),
    isLayout: yup
      .bool(),
    layout: yup
      .string()
      .required('Please Enter Layout'),
    defaultCultureName: yup
      .string()
      .required('Please Enter Default Culture Name'),
  });
}

export class TopicValidation {
  static mainSchema = yup.object().shape({
    name: yup
      .string()
      .required('Please Enter Topic Name'),
  });
}

export class TopicQueryValidation {
  static mainSchema = yup.object().shape({
    keyword: yup
      .string()
      .required('Please Enter Keyword'),
    count: yup
      .number()
      .min(1, 'Count Must Be Greater Than 0')
      .required('Please Enter Count'),
  });
}