// components/SalarySlip.tsx
import React from 'react';
import {Document, Page, StyleSheet, Text, View} from '@react-pdf/renderer';
import {Salary} from '@/app/db/queries/salary';
import dayjs from 'dayjs';

// Define custom fonts if needed
// Font.register({ family: 'Roboto', src: 'path/to/Roboto-Regular.ttf' });

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        padding: 3,
    },
    section: {
        marginBottom: 3,
        padding: 3,
        borderBottomWidth: 1,
        borderBottomColor: '#d3d3d3',
    },
    header: {
        fontSize: 8,
        marginBottom: 3,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    label: {
        fontSize: 6,
        fontWeight: 'bold',
    },
    value: {
        fontSize: 6,
    },
    value2: {
        fontSize: 6,
        fontWeight: 'bold'
    },
});

const SalarySlip: React.FC<Salary> = (salary) => (
    <Document>
        <Page size={[180, 210]} style={styles.page}>
            {/* Salary Slip Header */}
            <View style={styles.section}>
                <Text style={styles.header}>Salary Slip</Text>
                <Text style={styles.header}>CV Terang Jaya</Text>
            </View>

            {/* Employee Information */}
            <View style={styles.section}>
                <View style={styles.row}>
                    <Text style={styles.label}>Name:</Text>
                    <Text style={styles.value}>
                        {salary.Karyawan?.name || 'N/A'}
                    </Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Position:</Text>
                    <Text style={styles.value}>
                        {salary.Karyawan?.role || 'N/A'}
                    </Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Period:</Text>
                    <Text style={styles.value}>
                        {salary.month ? dayjs(salary.month).format('MMM YYYY') : 'N/A'}
                    </Text>
                </View>
            </View>

            {/* Attendance Information */}
            <View style={styles.section}>
                <View style={styles.row}>
                    <Text style={styles.label}>Working Days:</Text>
                    <Text style={styles.value}>
                        {salary.totalDayWork ?? 0}
                    </Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Absent:</Text>
                    <Text style={styles.value}>
                        {salary.totalAlpha ?? 0}
                    </Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Sick:</Text>
                    <Text style={styles.value}>
                        {salary.totalSick ?? 0}
                    </Text>
                </View>
            </View>

            {/* Salary Details */}
            <View style={styles.section}>
                <View style={styles.row}>
                    <Text style={styles.label}>Basic Salary:</Text>
                    <Text style={styles.value}>
                        {salary.baseSalary?.toLocaleString() || '0'}
                    </Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Meal Allowance:</Text>
                    <Text style={styles.value}>
                        {salary.foodSalary?.toLocaleString() || '0'}
                    </Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Bonus:</Text>
                    <Text style={styles.value}>
                        {salary.bonusSalary?.toLocaleString() || '0'}
                    </Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Deductions:</Text>
                    <Text style={styles.value}>
                        {salary.absenSalary?.toLocaleString() || '0'}
                    </Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Loadn:</Text>
                    <Text style={styles.value}>
                        {salary.loan?.toLocaleString() || '0'}
                    </Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Net Salary:</Text>
                    <Text style={styles.value2}>
                        {(
                            (salary.baseSalary || 0) +
                            (salary.foodSalary || 0) +
                            (salary.bonusSalary || 0) -
                            (salary.absenSalary || 0) - (salary.loan || 0)
                        ).toLocaleString()}
                    </Text>
                </View>
            </View>
        </Page>
    </Document>
);

export default SalarySlip;
