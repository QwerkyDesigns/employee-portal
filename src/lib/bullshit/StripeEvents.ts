export enum StripeEventsCustomBullshit {
    //
    // Summary:
    //     Occurs whenever an account status or property has changed.
    AccountUpdated = "account.updated",
    //
    // Summary:
    //     Occurs whenever a recipient is updated.
    RecipientUpdated = "recipient.updated",
    //
    // Summary:
    //     Occurs whenever a requested Stripe.Reporting.ReportRun failed to complete.
    ReportingReportRunFailed = "reporting.report_run.failed",
    //
    // Summary:
    //     Occurs whenever a requested Stripe.Reporting.ReportRun completed succesfully.
    ReportingReportRunSucceeded = "reporting.report_run.succeeded",
    //
    // Summary:
    //     Occurs whenever a requested Stripe.Reporting.ReportType is updated (typically
    //     to indicate that a new day's data has come available).
    ReportingReportTypeUpdated = "reporting.report_type.updated",
    //
    // Summary:
    //     Occurs whenever a review is closed. The review's reason field indicates why:
    //     approved, disputed, refunded, or refunded_as_fraud.
    ReviewClosed = "review.closed",
    //
    // Summary:
    //     Occurs whenever a review is opened.
    ReviewOpened = "review.opened",
    //
    // Summary:
    //     Occurs when a SetupIntent is canceled.
    SetupIntentCanceled = "setup_intent.canceled",
    //
    // Summary:
    //     Occurs when a new SetupIntent is created.
    SetupIntentCreated = "setup_intent.created",
    //
    // Summary:
    //     Occurs when a SetupIntent is in requires_action state.
    SetupIntentRequiresAction = "setup_intent.requires_action",
    //
    // Summary:
    //     Occurs when a SetupIntent has failed the attempt to setup a payment method.
    SetupIntentSetupFailed = "setup_intent.setup_failed",
    //
    // Summary:
    //     Occurs when a SetupIntent has successfully setup a payment method.
    SetupIntentSucceeded = "setup_intent.succeeded",
    //
    // Summary:
    //     Occurs whenever a recipient is deleted.
    RecipientDeleted = "recipient.deleted",
    //
    // Summary:
    //     Occurs whenever a Sigma scheduled query run finishes.
    SigmaScheduleQueryRunCreated = "sigma.scheduled_query_run.created",
    //
    // Summary:
    //     Occurs whenever a SKU is deleted.
    SkuDeleted = "sku.deleted",
    //
    // Summary:
    //     Occurs whenever a SKU is updated.
    SkuUpdated = "sku.updated",
    //
    // Summary:
    //     Occurs whenever a source is canceled.
    SourceCanceled = "source.canceled",
    //
    // Summary:
    //     Occurs whenever a source transitions to chargeable.
    SourceChargeable = "source.chargeable",
    //
    // Summary:
    //     Occurs whenever a source is failed.
    SourceFailed = "source.failed",
    //
    // Summary:
    //     Occurs whenever a source mandate notification method is set to manual.
    SourceMandateNotification = "source.mandate_notification",
    //
    // Summary:
    //     Occurs whenever the refund attributes are required on a receiver source to process
    //     a refund or a mispayment.
    SourceRefundAttributesRequired = "source.refund_attributes_required",
    //
    // Summary:
    //     Occurs whenever a source transaction is created.
    SourceTransactionCreated = "source.transaction.created",
    //
    // Summary:
    //     Occurs whenever a source transaction is updated.
    SourceTransactionUpdated = "source.transaction.updated",
    //
    // Summary:
    //     Occurs whenever a subscription schedule is canceled due to the underlying subscription
    //     being canceled because of delinquency.
    SubscriptionScheduleAborted = "subscription_schedule.aborted",
    //
    // Summary:
    //     Occurs whenever a subscription schedule is canceled.
    SubscriptionScheduleCanceled = "subscription_schedule.canceled",
    //
    // Summary:
    //     Occurs whenever a SKU is created.
    SkuCreated = "sku.created",
    //
    // Summary:
    //     Occurs whenever a new subscription schedule is completed.
    SubscriptionScheduleCompleted = "subscription_schedule.completed",
    //
    // Summary:
    //     Occurs whenever a recipient is created.
    RecipientCreated = "recipient.created",
    //
    // Summary:
    //     Occurs whenever an early fraud warning is created.
    RadarEarlyFraudWarningCreated = "radar.early_fraud_warning.created",
    //
    // Summary:
    //     Occurs whenever a payment method is updated via the API.
    PaymentMethodUpdated = "payment_method.updated",
    //
    // Summary:
    //     Occurs whenever a payout is canceled.
    PayoutCanceled = "payout.canceled",
    //
    // Summary:
    //     Occurs whenever a new payout is created.
    PayoutCreated = "payout.created",
    //
    // Summary:
    //     Occurs whenever Stripe attempts to send a payout and that transfer fails.
    PayoutFailed = "payout.failed",
    //
    // Summary:
    //     Occurs whenever a payout is *expected* to be available in the destination account.
    //     If the payout fails, a Stripe.Events.PayoutFailed notification is also sent,
    //     at a later time.
    PayoutPaid = "payout.paid",
    //
    // Summary:
    //     Occurs whenever a payout's metadata is updated.
    PayoutUpdated = "payout.updated",
    //
    // Summary:
    //     Occurs whenever a person is created.
    PersonCreated = "person.created",
    //
    // Summary:
    //     Occurs whenever a person is deleted.
    PersonDeleted = "person.deleted",
    //
    // Summary:
    //     Occurs whenever a person is updated.
    PersonUpdated = "person.updated",
    //
    // Summary:
    //     Occurs whenever a plan is created.
    PlanCreated = "plan.created",
    //
    // Summary:
    //     Occurs whenever a plan is deleted.
    PlanDeleted = "plan.deleted",
    //
    // Summary:
    //     Occurs whenever an early fraud warning is updated.
    RadarEarlyFraudWarningUpdated = "radar.early_fraud_warning.updated",
    //
    // Summary:
    //     Occurs whenever a plan is updated.
    PlanUpdated = "plan.updated",
    //
    // Summary:
    //     Occurs whenever a price is deleted.
    PriceDeleted = "price.deleted",
    //
    // Summary:
    //     Occurs whenever a price is updated.
    PriceUpdated = "price.updated",
    //
    // Summary:
    //     Occurs whenever a product is created.
    ProductCreated = "product.created",
    //
    // Summary:
    //     Occurs whenever a product is deleted.
    ProductDeleted = "product.deleted",
    //
    // Summary:
    //     Occurs whenever a product is updated.
    ProductUpdated = "product.updated",
    //
    // Summary:
    //     Occurs whenever a promotion code is created.
    PromotionCodeCreated = "promotion_code.created",
    //
    // Summary:
    //     Occurs whenever a promotion code is updated.
    PromotionCodeUpdated = "promotion_code.updated",
    //
    // Summary:
    //     Occurs whenever a quote is accepted.
    QuoteAccepted = "quote.accepted",
    //
    // Summary:
    //     Occurs whenever a quote is canceled.
    QuoteCanceled = "quote.canceled",
    //
    // Summary:
    //     Occurs whenever a quote is created.
    QuoteCreated = "quote.created",
    //
    // Summary:
    //     Occurs whenever a quote is finalized.
    QuoteFinalized = "quote.finalized",
    //
    // Summary:
    //     Occurs whenever a price is created.
    PriceCreated = "price.created",
    //
    // Summary:
    //     Occurs whenever a new subscription schedule is created.
    SubscriptionScheduleCreated = "subscription_schedule.created",
    //
    // Summary:
    //     Occurs 7 days before a subscription schedule will expire.
    SubscriptionScheduleExpiring = "subscription_schedule.expiring",
    //
    // Summary:
    //     Occurs whenever a new subscription schedule is released.
    SubscriptionScheduleReleased = "subscription_schedule.released",
    //
    // Summary:
    //     Occurs whenever an initial credit is granted on a DebitReversal.
    TreasuryDebitReversalInitialCreditGranted = "treasury.debit_reversal.initial_credit_granted",
    //
    // Summary:
    //     Occurs whenever the status of the FinancialAccount becomes closed.
    TreasuryFinancialAccountClosed = "treasury.financial_account.closed",
    //
    // Summary:
    //     Occurs whenever a new FinancialAccount is created.
    TreasuryFinancialAccountCreated = "treasury.financial_account.created",
    //
    // Summary:
    //     Occurs whenever the statuses of any features within an existing FinancialAccount
    //     are updated.
    TreasuryFinancialAccountFeaturesStatusUpdated = "treasury.financial_account.features_status_updated",
    //
    // Summary:
    //     Occurs whenever an InboundTransfer is canceled.
    TreasuryInboundTransferCanceled = "treasury.inbound_transfer.canceled",
    //
    // Summary:
    //     Occurs whenever an InboundTransfer is created.
    TreasuryInboundTransferCreated = "treasury.inbound_transfer.created",
    //
    // Summary:
    //     Occurs whenever an InboundTransfer has failed.
    TreasuryInboundTransferFailed = "treasury.inbound_transfer.failed",
    //
    // Summary:
    //     Occurs whenever an InboundTransfer has succeeded.
    TreasuryInboundTransferSucceeded = "treasury.inbound_transfer.succeeded",
    //
    // Summary:
    //     Occurs whenever an OutboundPayment is canceled.
    TreasuryOutboundPaymentCanceled = "treasury.outbound_payment.canceled",
    //
    // Summary:
    //     Occurs whenever a new OutboundPayment is successfully created.
    TreasuryOutboundPaymentCreated = "treasury.outbound_payment.created",
    //
    // Summary:
    //     Occurs whenever the arrival date on an OutboundPayment updates.
    TreasuryOutboundPaymentExpectedArrivalDateUpdated = "treasury.outbound_payment.expected_arrival_date_updated",
    //
    // Summary:
    //     Occurs whenever a DebitReversal is created.
    TreasuryDebitReversalCreated = "treasury.debit_reversal.created",
    //
    // Summary:
    //     Occurs whenever an OutboundPayment fails.
    TreasuryOutboundPaymentFailed = "treasury.outbound_payment.failed",
    //
    // Summary:
    //     Occurs whenever an OutboundPayment was returned.
    TreasuryOutboundPaymentReturned = "treasury.outbound_payment.returned",
    //
    // Summary:
    //     Occurs whenever an OutboundTransfer is canceled.
    TreasuryOutboundTransferCanceled = "treasury.outbound_transfer.canceled",
    //
    // Summary:
    //     Occurs whenever an OutboundTransfer is created.
    TreasuryOutboundTransferCreated = "treasury.outbound_transfer.created",
    //
    // Summary:
    //     Occurs whenever the arrival date on an OutboundTransfer updates.
    TreasuryOutboundTransferExpectedArrivalDateUpdated = "treasury.outbound_transfer.expected_arrival_date_updated",
    //
    // Summary:
    //     Occurs whenever an OutboundTransfer has failed.
    TreasuryOutboundTransferFailed = "treasury.outbound_transfer.failed",
    //
    // Summary:
    //     Occurs whenever an OutboundTransfer is posted.
    TreasuryOutboundTransferPosted = "treasury.outbound_transfer.posted",
    //
    // Summary:
    //     Occurs whenever an OutboundTransfer is returned.
    TreasuryOutboundTransferReturned = "treasury.outbound_transfer.returned",
    //
    // Summary:
    //     Occurs whenever a received_credit is created as a result of funds being pushed
    //     by another account.
    TreasuryReceivedCreditCreated = "treasury.received_credit.created",
    //
    // Summary:
    //     Occurs whenever a received_credit transitions to failed state. Only applicable
    //     for check deposits.
    TreasuryReceivedCreditFailed = "treasury.received_credit.failed",
    //
    // Summary:
    //     Occurs whenever a received_credit is reversed, and a received_debit is created.
    //     Only applicable for check deposits.
    TreasuryReceivedCreditReversed = "treasury.received_credit.reversed",
    //
    // Summary:
    //     Occurs whenever a received_credit transitions to succeeded state. Only applicable
    //     for check deposits.
    TreasuryReceivedCreditSucceeded = "treasury.received_credit.succeeded",
    //
    // Summary:
    //     Occurs whenever an OutboundPayment posts.
    TreasuryOutboundPaymentPosted = "treasury.outbound_payment.posted",
    //
    // Summary:
    //     Occurs whenever a DebitReversal is completed.
    TreasuryDebitReversalCompleted = "treasury.debit_reversal.completed",
    //
    // Summary:
    //     Occurs whenever an CreditReversal post is posted.
    TreasuryCreditReversalPosted = "treasury.credit_reversal.posted",
    //
    // Summary:
    //     Occurs whenever an CreditReversal is submitted and created.
    TreasuryCreditReversalCreated = "treasury.credit_reversal.created",
    //
    // Summary:
    //     Occurs whenever a subscription schedule is updated.
    SubscriptionScheduleUpdated = "subscription_schedule.updated",
    //
    // Summary:
    //     Occurs whenever a tax rate is created.
    TaxRateCreated = "tax_rate.created",
    //
    // Summary:
    //     Occurs whenever a tax rate changes.
    TaxRateUpdated = "tax_rate.updated",
    //
    // Summary:
    //     Occurs whenever an action sent to a Terminal reader failed.
    TerminalReaderActionFailed = "terminal.reader.action_failed",
    //
    // Summary:
    //     Occurs whenever an action sent to a Terminal reader was successful.
    TerminalReaderActionSucceeded = "terminal.reader.action_succeeded",
    //
    // Summary:
    //     Occurs whenever a test clock starts advancing.
    TestHelpersTestClockAdvancing = "test_helpers.test_clock.advancing",
    //
    // Summary:
    //     Occurs whenever a test clock is created.
    TestHelpersTestClockCreated = "test_helpers.test_clock.created",
    //
    // Summary:
    //     Occurs whenever a test clock is deleted.
    TestHelpersTestClockDeleted = "test_helpers.test_clock.deleted",
    //
    // Summary:
    //     Occurs whenever a test clock fails to advance its frozen time.
    TestHelpersTestClockInternalFailure = "test_helpers.test_clock.internal_failure",
    //
    // Summary:
    //     Occurs whenever a test clock transitions to a ready status.
    TestHelpersTestClockReady = "test_helpers.test_clock.ready",
    //
    // Summary:
    //     Occurs whenever a top-up is canceled.
    TopupCanceled = "topup.canceled",
    //
    // Summary:
    //     Occurs whenever a top-up is created.
    TopupCreated = "topup.created",
    //
    // Summary:
    //     Occurs whenever a top-up fails.
    TopupFailed = "topup.failed",
    //
    // Summary:
    //     Occurs whenever a top-up is reversed.
    TopupReversed = "topup.reversed",
    //
    // Summary:
    //     Occurs whenever a top-up succeeds.
    TopupSucceeded = "topup.succeeded",
    //
    // Summary:
    //     Occurs whenever a new transfer is created.
    TransferCreated = "transfer.created",
    //
    // Summary:
    //     Occurs whenever a transfer is reversed, including partial reversals.
    TransferReversed = "transfer.reversed",
    //
    // Summary:
    //     Occurs whenever the description or metadata of a transfer is updated.
    TransferUpdated = "transfer.updated",
    //
    // Summary:
    //     Occurs whenever a CheckDeposit is canceled.
    TreasuryCheckDepositCanceled = "treasury.check_deposit.canceled",
    //
    // Summary:
    //     Occurs whenever a CheckDeposit is created.
    TreasuryCheckDepositCreated = "treasury.check_deposit.created",
    //
    // Summary:
    //     Occurs whenever a CheckDeposit is processing.
    TreasuryCheckDepositProcessing = "treasury.check_deposit.processing",
    //
    // Summary:
    //     Occurs whenever a CheckDeposit is received.
    TreasuryCheckDepositReceived = "treasury.check_deposit.received",
    //
    // Summary:
    //     Occurs whenever a CheckDeposit requires action.
    TreasuryCheckDepositRequiresAction = "treasury.check_deposit.requires_action",
    //
    // Summary:
    //     Occurs whenever a CheckDeposit requires confirmation.
    TreasuryCheckDepositRequiresConfirmation = "treasury.check_deposit.requires_confirmation",
    //
    // Summary:
    //     Occurs whenever a CheckDeposit is reversed.
    TreasuryCheckDepositReversed = "treasury.check_deposit.reversed",
    //
    // Summary:
    //     Occurs whenever a payment method is detached from a customer.
    PaymentMethodDetached = "payment_method.detached",
    //
    // Summary:
    //     Occurs whenever a payment method's details are automatically updated by the network.
    PaymentMethodAutomaticallyUpdated = "payment_method.automatically_updated",
    //
    // Summary:
    //     Occurs whenever a new payment method is attached to a customer.
    PaymentMethodAttached = "payment_method.attached",
    //
    // Summary:
    //     Occurs when a Checkout Session is expired.
    CheckoutSessionExpired = "checkout.session.expired",
    //
    // Summary:
    //     Occurs whenever a coupon is created.
    CouponCreated = "coupon.created",
    //
    // Summary:
    //     Occurs whenever a coupon is deleted.
    CouponDeleted = "coupon.deleted",
    //
    // Summary:
    //     Occurs whenever a coupon is updated.
    CouponUpdated = "coupon.updated",
    //
    // Summary:
    //     Occurs whenever a credit note is created.
    CreditNoteCreated = "credit_note.created",
    //
    // Summary:
    //     Occurs whenever a credit note is updated.
    CreditNoteUpdated = "credit_note.updated",
    //
    // Summary:
    //     Occurs whenever a credit note is voided.
    CreditNoteVoided = "credit_note.voided",
    //
    // Summary:
    //     Occurs whenever a new customer is created.
    CustomerCreated = "customer.created",
    //
    // Summary:
    //     Occurs whenever a customer is deleted.
    CustomerDeleted = "customer.deleted",
    //
    // Summary:
    //     Occurs whenever any property of a customer changes.
    CustomerUpdated = "customer.updated",
    //
    // Summary:
    //     Occurs whenever a coupon is attached to a customer.
    CustomerDiscountCreated = "customer.discount.created",
    //
    // Summary:
    //     Occurs when a Checkout Session has been successfully completed.
    CheckoutSessionCompleted = "checkout.session.completed",
    //
    // Summary:
    //     Occurs whenever a customer's discount is removed.
    CustomerDiscountDeleted = "customer.discount.deleted",
    //
    // Summary:
    //     Occurs whenever a new source is created for the customer.
    CustomerSourceCreated = "customer.source.created",
    //
    // Summary:
    //     Occurs whenever a source is removed from a customer.
    CustomerSourceDeleted = "customer.source.deleted",
    //
    // Summary:
    //     Occurs whenever a source will expire at the end of the month.
    CustomerSourceExpiring = "customer.source.expiring",
    //
    // Summary:
    //     Occurs whenever a source's details are changed.
    CustomerSourceUpdated = "customer.source.updated",
    //
    // Summary:
    //     Occurs whenever a customer with no subscription is signed up for a plan.
    CustomerSubscriptionCreated = "customer.subscription.created",
    //
    // Summary:
    //     Occurs whenever a customer ends their subscription.
    CustomerSubscriptionDeleted = "customer.subscription.deleted",
    //
    // Summary:
    //     Occurs whenever a customer's subscription's pending update is applied, and the
    //     subscription is updated.
    CustomerSubscriptionPendingUpdateApplied = "customer.subscription.pending_update_applied",
    //
    // Summary:
    //     Occurs whenever a customer's subscription's pending update expires before the
    //     related invoice is paid.
    CustomerSubscriptionPendingUpdateExpired = "customer.subscription.pending_update_expired",
    //
    // Summary:
    //     Occurs three days before the trial period of a subscription is scheduled to end.
    CustomerSubscriptionTrialWillEnd = "customer.subscription.trial_will_end",
    //
    // Summary:
    //     Occurs whenever a subscription changes (e.g., switching from one plan to another,
    //     or changing the status from trial to active).
    CustomerSubscriptionUpdated = "customer.subscription.updated",
    //
    // Summary:
    //     Occurs whenever a tax ID is created for a customer.
    CustomerTaxIdCreated = "customer.tax_id.created",
    //
    // Summary:
    //     Occurs whenever a customer is switched from one coupon to another.
    CustomerDiscountUpdated = "customer.discount.updated",
    //
    // Summary:
    //     Occurs when a Checkout Session asynchronous payment has succeeded.
    CheckoutSessionAsyncPaymentSucceeded = "checkout.session.async_payment_succeeded",
    //
    // Summary:
    //     Occurs when a Checkout Session asynchronous payment has failed.
    CheckoutSessionAsyncPaymentFailed = "checkout.session.async_payment_failed",
    //
    // Summary:
    //     Occurs whenever a refund is updated on selected payment methods.
    ChargeRefundUpdated = "charge.refund.updated",
    //
    // Summary:
    //     Occurs whenever a user authorizes an application. Sent to the related application
    //     only.
    AccountApplicationAuthorized = "account.application.authorized",
    //
    // Summary:
    //     Occurs whenever a user deauthorizes an application. Sent to the related application
    //     only.
    AccountApplicationDeauthorized = "account.application.deauthorized",
    //
    // Summary:
    //     Occurs whenever an external account is created.
    AccountExternalAccountCreated = "account.external_account.created",
    //
    // Summary:
    //     Occurs whenever an external account is deleted.
    AccountExternalAccountDeleted = "account.external_account.deleted",
    //
    // Summary:
    //     Occurs whenever an external account is updated.
    AccountExternalAccountUpdated = "account.external_account.updated",
    //
    // Summary:
    //     Occurs whenever an application fee is created on a charge.
    ApplicationFeeCreated = "application_fee.created",
    //
    // Summary:
    //     Occurs whenever an application fee is refunded, whether from refunding a charge
    //     or from refunding the application fee directly, including partial refunds.
    ApplicationFeeRefunded = "application_fee.refunded",
    //
    // Summary:
    //     Occurs whenever an application fee refund is updated.
    ApplicationFeeRefundUpdated = "application_fee.refund.updated",
    //
    // Summary:
    //     Occurs whenever your Stripe balance has been updated (e.g. when a charge collected
    //     is available to be paid out). By default, Stripe will automatically transfer
    //     any funds in your balance to your bank account on a daily basis.
    BalanceAvailable = "balance.available",
    //
    // Summary:
    //     Occurs whenever a portal configuration is created.
    BillingPortalConfigurationCreated = "billing_portal.configuration.created",
    //
    // Summary:
    //     Occurs whenever a portal configuration is updated.
    BillingPortalConfigurationUpdated = "billing_portal.configuration.updated",
    //
    // Summary:
    //     Occurs whenever a capability has new requirements or a new status.
    CapabilityUpdated = "capability.updated",
    //
    // Summary:
    //     Occurs whenever there is a positive remaining cash balance after Stripe automatically
    //     reconciles new funds into the cash balance. If you enabled manual reconciliation,
    //     this webhook will fire whenever there are new funds into the cash balance.
    CashBalanceFundsAvailable = "cash_balance.funds_available",
    //
    // Summary:
    //     Occurs whenever a previously uncaptured charge is captured.
    ChargeCaptured = "charge.captured",
    //
    // Summary:
    //     Occurs whenever a previously uncaptured charge expires.
    ChargeExpired = "charge.expired",
    //
    // Summary:
    //     Occurs whenever a failed charge attempt occurs.
    ChargeFailed = "charge.failed",
    //
    // Summary:
    //     Occurs whenever a pending charge is created.
    ChargePending = "charge.pending",
    //
    // Summary:
    //     Occurs whenever a charge is refunded, including partial refunds.
    ChargeRefunded = "charge.refunded",
    //
    // Summary:
    //     Occurs whenever a new charge is created and is successful.
    ChargeSucceeded = "charge.succeeded",
    //
    // Summary:
    //     Occurs whenever a charge description or metadata is updated.
    ChargeUpdated = "charge.updated",
    //
    // Summary:
    //     Occurs when the dispute is closed and the dispute status changes to charge_refunded,
    //     lost, warning_closed, or won.
    ChargeDisputeClosed = "charge.dispute.closed",
    //
    // Summary:
    //     Occurs whenever a customer disputes a charge with their bank.
    ChargeDisputeCreated = "charge.dispute.created",
    //
    // Summary:
    //     Occurs when funds are reinstated to your account after a dispute is closed. This
    //     includes partially refunded payments.
    ChargeDisputeFundsReinstated = "charge.dispute.funds_reinstated",
    //
    // Summary:
    //     Occurs when funds are removed from your account due to a dispute.
    ChargeDisputeFundsWithdrawn = "charge.dispute.funds_withdrawn",
    //
    // Summary:
    //     Occurs when the dispute is updated (usually with evidence).
    ChargeDisputeUpdated = "charge.dispute.updated",
    //
    // Summary:
    //     Occurs whenever a tax ID is deleted from a customer.
    CustomerTaxIdDeleted = "customer.tax_id.deleted",
    //
    // Summary:
    //     Occurs whenever a received_debit is created as a result of funds being pulled
    //     by another account.
    TreasuryReceivedDebitCreated = "treasury.received_debit.created",
    //
    // Summary:
    //     Occurs whenever a customer's tax ID is updated.
    CustomerTaxIdUpdated = "customer.tax_id.updated",
    //
    // Summary:
    //     Occurs whenever a VerificationSession is canceled.
    IdentityVerificationSessionCanceled = "identity.verification_session.canceled",
    //
    // Summary:
    //     Occurs whenever a dispute is closed.
    IssuingDisputeClosed = "issuing_dispute.closed",
    //
    // Summary:
    //     Occurs whenever an issuing dispute is created.
    IssuingDisputeCreated = "issuing_dispute.created",
    //
    // Summary:
    //     Occurs whenever an issuing dispute's funds are reinstate.
    IssuingDisputeFundsReinstated = "issuing_dispute.funds_reinstated",
    //
    // Summary:
    //     Occurs whenever a dispute is submitted.
    IssuingDisputeSubmitted = "issuing_dispute.submitted",
    //
    // Summary:
    //     Occurs whenever an issuing dispute is updated.
    IssuingDisputeUpdated = "issuing_dispute.updated",
    //
    // Summary:
    //     Occurs whenever an issuing transaction is created.
    IssuingTransactionCreated = "issuing_transaction.created",
    //
    // Summary:
    //     Occurs whenever an issuing transaction is updated.
    IssuingTransactionUpdated = "issuing_transaction.updated",
    //
    // Summary:
    //     Occurs whenever a mandate is updated.
    MandateUpdated = "mandate.updated",
    //
    // Summary:
    //     Occurs whenever an order is created.
    OrderCreated = "order.created",
    //
    // Summary:
    //     Occurs whenever payment is attempted on an order, and the payment fails.
    OrderPaymentFailed = "order.payment_failed",
    //
    // Summary:
    //     Occurs whenever payment is attempted on an order, and the payment succeeds.
    OrderPaymentSucceeded = "order.payment_succeeded",
    //
    // Summary:
    //     Occurs whenever an issuing cardholder is updated.
    IssuingCardholderUpdated = "issuing_cardholder.updated",
    //
    // Summary:
    //     Occurs whenever an order is updated.
    OrderUpdated = "order.updated",
    //
    // Summary:
    //     Occurs whenever a payment is created.
    PaymentCreated = "payment.created",
    //
    // Summary:
    //     Occurs when a payment link is created.
    PaymentLinkCreated = "payment_link.created",
    //
    // Summary:
    //     Occurs when a payment link is updated.
    PaymentLinkUpdated = "payment_link.updated",
    //
    // Summary:
    //     Occurs when a Stripe.PaymentIntent has funds to be captured. Check the Stripe.PaymentIntent.AmountCapturable
    //     property on the PaymentIntent to determine the amount that can be captured. You
    //     may capture the PaymentIntent with an Stripe.PaymentIntentCaptureOptions.AmountToCapture
    //     value up to the specified amount. Learn more about capturing PaymentIntents.
    PaymentIntentAmountCapturableUpdated = "payment_intent.amount_capturable_updated",
    //
    // Summary:
    //     Occurs when a PaymentIntent is canceled.
    PaymentIntentCanceled = "payment_intent.canceled",
    //
    // Summary:
    //     Occurs when a new PaymentIntent is created.
    PaymentIntentCreated = "payment_intent.created",
    //
    // Summary:
    //     Occurs when funds are applied to a customer_balance PaymentIntent and the 'amount_remaining'
    //     changes.
    PaymentIntentPartiallyFunded = "payment_intent.partially_funded",
    //
    // Summary:
    //     Occurs when a PaymentIntent has failed the attempt to create a source or a payment.
    PaymentIntentPaymentFailed = "payment_intent.payment_failed",
    //
    // Summary:
    //     Occurs when a PaymentIntent has started processing.
    PaymentIntentProcessing = "payment_intent.processing",
    //
    // Summary:
    //     Occurs when a PaymentIntent transitions to requires_action state.
    PaymentIntentRequiresAction = "payment_intent.requires_action",
    //
    // Summary:
    //     Occurs when a PaymentIntent has been successfully fulfilled.
    PaymentIntentSucceeded = "payment_intent.succeeded",
    //
    // Summary:
    //     Occurs whenever an order return is created.
    OrderReturnCreated = "order_return.created",
    //
    // Summary:
    //     Occurs whenever an issuing cardholder is created.
    IssuingCardholderCreated = "issuing_cardholder.created",
    //
    // Summary:
    //     Occurs whenever an issuing card is updated.
    IssuingCardUpdated = "issuing_card.updated",
    //
    // Summary:
    //     Occurs whenever an issuing card is created.
    IssuingCardCreated = "issuing_card.created",
    //
    // Summary:
    //     Occurs whenever a VerificationSession is created.
    IdentityVerificationSessionCreated = "identity.verification_session.created",
    //
    // Summary:
    //     Occurs whenever a VerificationSession transitions to processing.
    IdentityVerificationSessionProcessing = "identity.verification_session.processing",
    //
    // Summary:
    //     Occurs whenever a VerificationSession is redacted.
    IdentityVerificationSessionRedacted = "identity.verification_session.redacted",
    //
    // Summary:
    //     Occurs whenever a VerificationSession transitions to require user input.
    IdentityVerificationSessionRequiresInput = "identity.verification_session.requires_input",
    //
    // Summary:
    //     Occurs whenever a VerificationSession is verified.
    IdentityVerificationSessionVerified = "identity.verification_session.verified",
    //
    // Summary:
    //     Occurs whenever a new invoice is created. To learn how webhooks can be used with
    //     this event, and how they can affect it, see Using Webhooks with Subscriptions.
    InvoiceCreated = "invoice.created",
    //
    // Summary:
    //     Occurs whenever a draft invoice is deleted.
    InvoiceDeleted = "invoice.deleted",
    //
    // Summary:
    //     Deprecated, use InvoiceFinalizationFailed.
    InvoiceFinalizationError = "invoice.finalization_error",
    //
    // Summary:
    //     Occurs whenever a draft invoice cannot be finalized.
    InvoiceFinalizationFailed = "invoice.finalization_failed",
    //
    // Summary:
    //     Occurs whenever a draft invoice is finalized and updated to be an open invoice.
    InvoiceFinalized = "invoice.finalized",
    //
    // Summary:
    //     Occurs whenever an invoice is marked uncollectible.
    InvoiceMarkedUncollectible = "invoice.marked_uncollectible",
    //
    // Summary:
    //     Occurs whenever an invoice payment attempt succeeds or an invoice is marked as
    //     paid out-of-band.
    InvoicePaid = "invoice.paid",
    //
    // Summary:
    //     Occurs whenever an invoice payment attempt requires further user action to complete.
    InvoicePaymentActionRequired = "invoice.payment_action_required",
    //
    // Summary:
    //     Occurs whenever an invoice payment attempt fails, due either to a declined payment
    //     or to the lack of a stored payment method.
    InvoicePaymentFailed = "invoice.payment_failed",
    //
    // Summary:
    //     Occurs whenever an invoice email is sent out.
    InvoiceSent = "invoice.sent",
    //
    // Summary:
    //     Occurs X number of days before a subscription is scheduled to create an invoice
    //     that is automatically charged—where X is determined by your subscriptions settings.
    //     Note: The received Stripe.Invoice object will not have an invoice ID.
    InvoiceUpcoming = "invoice.upcoming",
    //
    // Summary:
    //     Occurs whenever an invoice changes (e.g., the invoice amount).
    InvoiceUpdated = "invoice.updated",
    //
    // Summary:
    //     Occurs whenever an invoice is voided.
    InvoiceVoided = "invoice.voided",
    //
    // Summary:
    //     Occurs whenever an invoice item is created.
    InvoiceItemCreated = "invoiceitem.created",
    //
    // Summary:
    //     Occurs whenever an invoice item is deleted.
    InvoiceItemDeleted = "invoiceitem.deleted",
    //
    // Summary:
    //     Occurs whenever an invoice item is updated.
    InvoiceItemUpdated = "invoiceitem.updated",
    //
    // Summary:
    //     Occurs whenever an issuing authorization is created.
    IssuingAuthorizationCreated = "issuing_authorization.created",
    //
    // Summary:
    //     Occurs whenever an issuing authorization request is sent.
    IssuingAuthorizationRequest = "issuing_authorization.request",
    //
    // Summary:
    //     Occurs whenever an issuing authorization is updated.
    IssuingAuthorizationUpdated = "issuing_authorization.updated",
    //
    // Summary:
    //     Occurs whenever a new Stripe-generated file is available for your account.
    FileCreated = "file.created",
    //
    // Summary:
    //     May be sent by Stripe at any time to see if a provided webhook URL is working.
    Ping = "ping",
}

export default StripeEventsCustomBullshit;
