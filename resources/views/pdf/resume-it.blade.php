<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Computer Science Resume</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        <?php
        // Count actual content lines and fields
        $contentLines = 0;
        foreach ($optimizedData['education'] as $edu) {
            if (!empty($edu['schoolName'])) {
                $contentLines += 3;
            }
        }
        foreach ($optimizedData['experiences'] as $exp) {
            if (!empty($exp['companyName'])) {
                $contentLines += 3;
            }
        }
        if (!empty($optimizedData['formData']['summaryOfQualification'])) {
            $contentLines += substr_count($optimizedData['formData']['summaryOfQualification'], "\n") + 2;
        }
        if (!empty($optimizedData['formData']['technicalSkills'])) {
            $contentLines += substr_count($optimizedData['formData']['technicalSkills'], "\n") + 2;
        }
        if (!empty($optimizedData['formData']['honorAndActivities'])) {
            $contentLines += substr_count($optimizedData['formData']['honorAndActivities'], "\n") + 2;
        }
        
        if ($contentLines <= 15) {
            $fontSize = 16;
            $nameSize = 28;
            $sectionSize = 16;
        } elseif ($contentLines <= 25) {
            $fontSize = 14;
            $nameSize = 24;
            $sectionSize = 14;
        } elseif ($contentLines <= 35) {
            $fontSize = 12;
            $nameSize = 20;
            $sectionSize = 12;
        } else {
            $fontSize = 10;
            $nameSize = 16;
            $sectionSize = 10;
        }
        ?><?php
        // Count actual content lines and fields
        $contentLines = 0;
        foreach ($optimizedData['education'] as $edu) {
            if (!empty($edu['schoolName'])) {
                $contentLines += 3;
            }
        }
        foreach ($optimizedData['experiences'] as $exp) {
            if (!empty($exp['companyName'])) {
                $contentLines += 3;
            }
        }
        if (!empty($optimizedData['formData']['summaryOfQualification'])) {
            $contentLines += substr_count($optimizedData['formData']['summaryOfQualification'], "\n") + 2;
        }
        if (!empty($optimizedData['formData']['technicalSkills'])) {
            $contentLines += substr_count($optimizedData['formData']['technicalSkills'], "\n") + 2;
        }
        if (!empty($optimizedData['formData']['honorAndActivities'])) {
            $contentLines += substr_count($optimizedData['formData']['honorAndActivities'], "\n") + 2;
        }
        
        if ($contentLines <= 15) {
            $fontSize = 16;
            $nameSize = 28;
            $sectionSize = 16;
        } elseif ($contentLines <= 25) {
            $fontSize = 14;
            $nameSize = 24;
            $sectionSize = 14;
        } elseif ($contentLines <= 35) {
            $fontSize = 12;
            $nameSize = 20;
            $sectionSize = 12;
        } else {
            $fontSize = 10;
            $nameSize = 16;
            $sectionSize = 10;
        }
        ?>body {
            font-family: 'Arial', sans-serif;
            line-height: 1.1;
            color: #333;
            background-color: white;
            padding: 0;
            margin: 10px;
            font-size: {{ $fontSize }}px;
        }

        .resume {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 15px;
            box-shadow: none;
        }

        .header {
            text-align: center;
            margin-bottom: 15px;
            border-bottom: 2px solid #333;
            padding-bottom: 8px;
        }

        .name {
            font-size: {{ $nameSize }}px;
            font-weight: 900;
            margin-bottom: 5px;
            letter-spacing: 1px;
        }

        .contact-info {
            font-size: {{ $fontSize - 1 }}px;
            color: #666;
            font-weight: 600;
        }

        .section {
            margin-bottom: 12px;
        }

        .section-title {
            font-size: {{ $sectionSize }}px;
            font-weight: 900;
            text-transform: uppercase;
            border-bottom: 1px solid #333;
            padding-bottom: 1px;
            margin-bottom: 5px;
            letter-spacing: 0.5px;
        }

        .education-item,
        .experience-item {
            margin-bottom: 8px;
        }

        .institution,
        .company {
            font-weight: 900;
            font-size: {{ $fontSize }}px;
        }

        .degree,
        .position {
            font-style: italic;
            margin-bottom: 2px;
            font-weight: 600;
            font-size: {{ $fontSize - 1 }}px;
        }

        .details {
            margin-left: 0;
            margin-top: 3px;
        }

        .details li {
            list-style-type: disc;
            margin-bottom: 1px;
            margin-left: 15px;
            font-weight: 600;
            font-size: {{ $fontSize - 1 }}px;
        }

        .skills-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 5px;
        }

        .skill-item {
            display: flex;
            margin-bottom: 2px;
            font-size: {{ $fontSize - 1 }}px;
        }

        .skill-label {
            font-weight: 900;
            min-width: 120px;
        }

        .honors-list {
            margin-left: 0;
        }

        .honors-list li {
            list-style-type: disc;
            margin-bottom: 1px;
            margin-left: 15px;
            font-weight: 600;
            font-size: {{ $fontSize - 1 }}px;
        }

        .thesis {
            font-style: italic;
            margin-bottom: 2px;
            font-weight: 600;
            font-size: {{ $fontSize - 1 }}px;
        }
    </style>
</head>


<body>
    <div class="resume">
        <div class="header">
            <div class="name">{{ $optimizedData['formData']['name'] }}</div>
            <div class="contact-info">
                {{ $optimizedData['formData']['address'] }} –
                @if ($optimizedData['formData']['github'])
                    {{ $optimizedData['formData']['github'] }} –
                @endif
                @if ($optimizedData['formData']['linkedin'])
                    {{ $optimizedData['formData']['linkedin'] }}
                @endif
            </div>
        </div>

        @if ($optimizedData['formData']['summaryOfQualification'])
            <div class="section">
                <div class="section-title">Summary of Qualifications</div>
                <div>{!! nl2br($optimizedData['formData']['summaryOfQualification']) !!}</div>
            </div>
        @endif

        <div class="section">
            <div class="section-title">Education</div>
            @foreach ($optimizedData['education'] as $edu)
                @if ($edu['schoolName'])
                    <div class="education-item">
                        <div class="institution">{{ $edu['schoolName'] }}</div>
                        <div class="location-date">{{ $edu['schoolYear'] }}</div>
                        <div class="degree">{{ $edu['level'] }}
                            {{ $edu['achievement'] ? '- ' . $edu['achievement'] : '' }}</div>
                    </div>
                @endif
            @endforeach
        </div>

        @if ($optimizedData['formData']['technicalSkills'])
            <div class="section">
                <div class="section-title">Technical Skills</div>
                <div>{!! nl2br($optimizedData['formData']['technicalSkills']) !!}</div>
            </div>
        @endif

        <div class="section">
            <div class="section-title">Experience</div>
            @foreach ($optimizedData['experiences'] as $exp)
                @if ($exp['companyName'])
                    <div class="experience-item">
                        <div
                            style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2px;">
                            <div class="company">{{ $exp['companyName'] }}</div>
                            <div style="font-size: {{ $fontSize - 1 }}px; color: #333; font-weight: 600;">
                                {{ $exp['year'] }}</div>
                        </div>
                        <div class="position">{{ $exp['role'] }}</div>
                    </div>
                @endif
            @endforeach
        </div>

        @if ($optimizedData['formData']['honorAndActivities'])
            <div class="section">
                <div class="section-title">Honors & Activities</div>
                <div>{!! nl2br($optimizedData['formData']['honorAndActivities']) !!}</div>
            </div>
        @endif
    </div>
</body>

</html>
