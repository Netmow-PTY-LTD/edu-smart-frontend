import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import React from 'react';
import {
  default as logoDark,
  default as logoLight,
} from '../../../public/logo-share/sd_logo.png';

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#FFFFFF',
  },
  section: {
    marginBottom: 20,
    padding: 10,
    borderBottom: '1px solid #E4E4E4',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  addressSection: {
    marginBottom: 20,
  },
  invoiceDetails: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  table: {
    display: 'table',
    width: 'auto',
    margin: '20px 0',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCell: {
    flexGrow: 1,
    padding: 5,
  },
  totalSection: {
    marginTop: 20,
    borderTop: '1px solid #E4E4E4',
    paddingTop: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
  textUppercase: {
    textTransform: 'uppercase',
  },
  textMuted: {
    color: '#888888',
  },
});

// Create Document Component
export const MyDocument = ({
  addressData,
  billingAddressData,
  tableData,
  charges_type,
  subtotal,
  gst,
  total,
  currency,
  gstPercent,
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Image src={logoDark} style={{ height: 40 }} alt="logo dark" />
        <Image src={logoLight} style={{ height: 40 }} alt="logo light" />
      </View>

      <View style={styles.section}>
        <Text style={[styles.boldText, styles.textUppercase, styles.textMuted]}>
          Address
        </Text>
        <Text style={styles.textMuted}>
          {billingAddressData?.first_name} {billingAddressData?.last_name}
        </Text>
        <Text style={styles.textMuted}>{billingAddressData?.email}</Text>
        <Text style={styles.textMuted}>{billingAddressData?.phone}</Text>
        <Text style={styles.textMuted}>
          {billingAddressData?.city} {billingAddressData?.state}{' '}
          {billingAddressData?.zip} {billingAddressData?.country}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.boldText, styles.textUppercase]}>
          Billing Address
        </Text>
        <Text style={styles.textMuted}>
          {addressData?.data?.first_name} {addressData?.data?.last_name}
        </Text>
        <Text style={styles.textMuted}>{addressData?.data?.email}</Text>
        <Text style={styles.textMuted}>{addressData?.data?.phone}</Text>
        <Text style={styles.textMuted}>
          {addressData?.data?.city} {addressData?.data?.state}{' '}
          {addressData?.zip} {addressData?.data?.country}
        </Text>
      </View>

      <View style={styles.invoiceDetails}>
        <View>
          <Text
            style={[styles.textMuted, styles.textUppercase, styles.boldText]}
          >
            Invoice No
          </Text>
          <Text>
            {billingAddressData?._id
              ? `INV-${billingAddressData._id.substring(16, 24)}`
              : ''}
          </Text>
        </View>
        <View>
          <Text
            style={[styles.textMuted, styles.textUppercase, styles.boldText]}
          >
            Date
          </Text>
          <Text>{new Date().toDateString()}</Text>
        </View>
        <View>
          <Text
            style={[styles.textMuted, styles.textUppercase, styles.boldText]}
          >
            Payment Status
          </Text>
          <Text style={{ color: 'green' }}>Paid</Text>
        </View>
        <View>
          <Text
            style={[styles.textMuted, styles.textUppercase, styles.boldText]}
          >
            Total Amount
          </Text>
          <Text>
            {total} {currency}
          </Text>
        </View>
      </View>

      <View style={styles.table}>
        <View style={[styles.tableRow, styles.boldText, styles.textUppercase]}>
          <Text style={styles.tableCell}>SL</Text>
          <Text style={styles.tableCell}>Event Name</Text>
          <Text style={styles.tableCell}>Charge Type</Text>
          <Text style={styles.tableCell}>Guardian Name</Text>
          <Text style={styles.tableCell}>Player Name</Text>
          <Text style={styles.tableCell}>Billing Status</Text>
          <Text style={styles.tableCell}>Amount</Text>
        </View>
        {tableData && (
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>1</Text>
            <Text style={styles.tableCell}>
              {tableData?.name || tableData?.event_name}
            </Text>
            <Text style={styles.tableCell}>
              {charges_type || 'Default Charge Type'}
            </Text>
            <Text style={styles.tableCell}>
              {tableData?.guardian_id
                ? `${tableData.guardian_id.first_name} ${tableData.guardian_id.last_name}`
                : tableData?.guardian?._id
                  ? `${tableData.guardian.first_name} ${tableData.guardian.last_name}`
                  : tableData?.user?.guardian
                    ? `${tableData.user.guardian.first_name} ${tableData.user.guardian.last_name}`
                    : billingAddressData?.role !== 'player'
                      ? `${billingAddressData.first_name} ${billingAddressData.last_name}`
                      : ''}
            </Text>
            <Text style={styles.tableCell}>
              {tableData?.role === 'player'
                ? `${tableData.first_name} ${tableData.last_name}`
                : tableData?.user?.role === 'player'
                  ? `${tableData.user.first_name} ${tableData.user.last_name}`
                  : billingAddressData?.role === 'player'
                    ? `${billingAddressData.first_name} ${billingAddressData.last_name}`
                    : ''}
            </Text>
            <Text style={[styles.tableCell, { color: 'green' }]}>PAID</Text>
            <Text style={styles.tableCell}>
              {tableData?.fees || tableData?.event_id?.fees} {currency}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.totalSection}>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Sub Total :</Text>
          <Text style={styles.tableCell}>
            {subtotal} {currency}
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>SD Fee :</Text>
          <Text style={styles.tableCell}>1 {currency}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>GST ({gstPercent}%):</Text>
          <Text style={styles.tableCell}>
            {gst} {currency}
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Total Amount :</Text>
          <Text style={styles.tableCell}>
            {total} {currency}
          </Text>
        </View>
      </View>
    </Page>
  </Document>
);
