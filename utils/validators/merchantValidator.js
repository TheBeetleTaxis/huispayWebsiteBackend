import { body } from 'express-validator';
import Merchant from '../../models/merchantModel.js';

// Valid countries
const validCountries = ['Nigeria', 'Ghana', 'Egypt', 'Morocco'];

// Valid payment size
const validPaymentSize = [20000, 600000, 8000000, 10000000];

// Validator middleware for creating a merchant
const createMerchantValidator = [
	// Validation for 'firstName' field
	body('firstName')
		.notEmpty()
		.withMessage('First name is required')
		.isAlpha()
		.withMessage('First name must contain only alphabetic characters'),
	// Validation for 'lastName' field
	body('lastName')
		.notEmpty()
		.withMessage('Last name is required')
		.isAlpha()
		.withMessage('Last name must contain only alphabetic characters'),
	// Validation for 'email' field
	body('email')
		.notEmpty()
		.withMessage('Email is required')
		.isEmail()
		.withMessage('Please enter a valid email')
		.custom((value) => {
			// Check if the email already exists in the database
			return Merchant.findOne({ email: value }).then((user) => {
				if (user) {
					return Promise.reject('Email already in use');
				}
			});
		}),
	// Validation for 'phoneNumber' field
	body('phoneNumber')
		.notEmpty()
		.withMessage('Phone number is required')
		.isMobilePhone()
		.withMessage('Invalid phone number')
		.custom((value) => {
			// Check if the phone number already exists in the database
			return Merchant.findOne({ phoneNumber: value }).then((user) => {
				if (user) {
					return Promise.reject('Phone number already in use');
				}
			});
		}),
	// Validation for 'businessName' field
	body('businessName')
		.notEmpty()
		.withMessage('Business name is required')
		.isAscii()
		.withMessage('Business name must contain only ASCII characters')
		.custom((value) => {
			// Check if the business name already exists in the database
			return Merchant.findOne({ businessName: value }).then((user) => {
				if (user) {
					return Promise.reject('Business name already in use');
				}
			});
		}),
	// Validation for 'businessWebsite' field
	body('businessWebsite')
		.optional({ checkFalsy: true })
		.isURL()
		.withMessage('Business website must be a valid url')
		.custom((value) => {
			// Check if the business website already exists in the database
			return Merchant.findOne({ website: value }).then((user) => {
				if (user) {
					return Promise.reject('Business website already in use');
				}
			});
		}),
	// Validation for 'businessSize' field
	body('businessSize')
		.optional({ checkFalsy: true })
		.isInt()
		.withMessage('Business size must be a valid integer'),
	// Validation for 'product' field
	body('product')
		.optional({ checkFalsy: true })
		.isAscii()
		.withMessage('Product must contain only ASCII characters'),
	// Validation for 'country' field
	body('country')
		.notEmpty()
		.withMessage('Country is required')
		.isIn(validCountries)
		.withMessage(`Invalid country, only ${validCountries} are allowed`),
	// Validation for 'payment' field
	body('payment')
		.optional({ checkFalsy: true })
		.isIn(validPaymentSize)
		.withMessage(
			`Invalid payment size, only ${validPaymentSize} are allowed`
		),
	// Validation for 'tellUsMore' field
	body('tellUsMore')
		.optional({ checkFalsy: true })
		.isAscii()
		.withMessage('Tell us more field must contain only ASCII characters'),
	// Validation for 'update' field
	body('update')
		.optional({ checkFalsy: true })
		.isBoolean()
		.withMessage('Update must be a boolean'),
];

export { createMerchantValidator };
