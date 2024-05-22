import { Day, Inject, Month, ScheduleComponent, /* ViewDirective,  */Week } from '@syncfusion/ej2-react-schedule';
import React from 'react';
import { registerLicense } from "@syncfusion/ej2-base";
import './SchedulingPage.css';

registerLicense("Ngo9BigBOggjHTQxAR8/V1NBaF1cXmhPYVF3WmFZfVpgfF9DYVZUQWYuP1ZhSXxXdkBhW39WdXVQQGFfV0A=");


const SchedulingPage = function SchedulingPage() {

    const data = [
        {
            Id: 1,
            Subject: 'Gabby',
            StartTime: new Date(2024, 4, 22, 10, 0),
            EndTime: new Date(2024, 4, 22, 17, 30),
        },
        {
            Id: 2,
            Subject: 'Sakis',
            StartTime: new Date(2024, 4, 23, 10, 0),
            EndTime: new Date(2024, 4, 23, 17, 30),
        },
        {
            Id: 3,
            Subject: 'Georgi',
            StartTime: new Date(2024, 4, 24, 10, 0),
            EndTime: new Date(2024, 4, 24, 17, 30),
        },
        {
            Id: 4,
            Subject: 'Stavrula',
            StartTime: new Date(2024, 4, 25, 10, 0),
            EndTime: new Date(2024, 4, 25, 17, 30),
        },
    ];

    return (
        <main className='main-container'>
            <ScheduleComponent
                selectedDate={new Date(2024, 4, 22)}
                width={800}
                height={500}
                eventSettings={{
                    dataSource: data,
                }}
            >

                {/* <ViewDirective>
                <ViewDirective option='Day' />
                <ViewDirective option='Week' />
                <ViewDirective option='Month' />
            </ViewDirective> */}

                <Inject services={[Day, Week, Month]} />
            </ScheduleComponent>
        </main>
    )
}

export default SchedulingPage;