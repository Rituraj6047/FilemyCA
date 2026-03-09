'use client';

import {
    BarChart,
    Bar,
    XAxis,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from 'recharts';
import { submissionData } from '@/data/dummyClients';

interface TooltipProps {
    active?: boolean;
    payload?: Array<{ value: number }>;
    label?: string;
}

function CustomTooltip({ active, payload, label }: TooltipProps) {
    if (!active || !payload?.length) return null;
    return (
        <div
            style={{
                background: '#1a1a26',
                border: '1px solid #2a2a3a',
                borderRadius: '8px',
                padding: '10px 14px',
                fontSize: '13px',
                color: '#f0f0ff',
            }}
        >
            <div style={{ color: '#8888aa', marginBottom: '4px' }}>{label}</div>
            <div style={{ fontWeight: 600 }}>{payload[0].value} submitted</div>
        </div>
    );
}

export default function SubmissionChart() {
    return (
        <div className="chart-section dashboard-section">
            <div className="chart-title">Submission History</div>
            <ResponsiveContainer width="100%" height={200}>
                <BarChart data={submissionData} barCategoryGap="30%">
                    <XAxis
                        dataKey="month"
                        axisLine={{ stroke: '#2a2a3a' }}
                        tickLine={false}
                        tick={{ fill: '#8888aa', fontSize: 13 }}
                    />
                    <Tooltip
                        content={<CustomTooltip />}
                        cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                    />
                    <Bar dataKey="submitted" radius={[6, 6, 0, 0]}>
                        {submissionData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={entry.complete ? '#6366f1' : 'rgba(99,102,241,0.4)'}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
