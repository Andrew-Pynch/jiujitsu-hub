import { Input, Label, Radio, Switch } from '@rebass/forms';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { Box, Button, Flex, Heading } from 'rebass';
import FRow from '../../components/FRow';

type RecordProps = {};

const Record = (props: RecordProps) => {
    const [opponent, setOponent] = useState('');
    const [result, setResult] = useState<
        'won' | 'stalled' | 'tied' | 'lost' | ''
    >('');
    const [approximateDuration, setApproximateDuration] = useState(0);
    const [resultBy, setResultBy] = useState<'points' | 'submission' | ''>('');
    const [submissionType, setSubmissionType] = useState('');
    const [notes, setNotes] = useState('');
    const [positionsStruggledIn, setPositionsStruggledIn] = useState<string[]>(
        []
    );

    return (
        <Box width="100vw" height="100vh">
            <Flex
                sx={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <FRow>
                    <Label>Opponent</Label>
                    <Input
                        type="text"
                        name="opponent"
                        onChange={(e) => {
                            setOponent(e.target.value);
                        }}
                        value={opponent}
                    />
                </FRow>
                <FRow>
                    <Heading>Result</Heading>
                    <Label>
                        <Radio
                            name="result"
                            onClick={(e) => setResult('won')}
                        />
                        Won
                    </Label>
                    <Label>
                        <Radio
                            name="result"
                            onClick={(e) => setResult('stalled')}
                        />
                        Stalled
                    </Label>
                    <Label>
                        <Radio
                            name="result"
                            onClick={(e) => setResult('tied')}
                        />
                        Tied
                    </Label>
                    <Label>
                        <Radio
                            name="result"
                            onClick={(e) => setResult('lost')}
                        />
                        Lost
                    </Label>
                </FRow>
                <FRow>
                    <Label>Approximate Duration</Label>
                    <Input
                        type="number"
                        name="approximateDuration"
                        onChange={(e) => {
                            setApproximateDuration(
                                parseInt(e.target.value, 10)
                            );
                        }}
                        value={approximateDuration}
                    />
                </FRow>
                <FRow>
                    <Heading>Result By</Heading>
                    <Label>
                        <Radio
                            name="resultby"
                            onClick={(e) => setResultBy('points')}
                        />
                        Points
                    </Label>
                    <Label>
                        <Radio
                            name="resultby"
                            onClick={(e) => setResultBy('submission')}
                        />
                        Submission
                    </Label>
                </FRow>
                <FRow>
                    <Label>Submission Type</Label>
                    <Input
                        type="text"
                        name="submissionType"
                        onChange={(e) => {
                            setSubmissionType(e.target.value);
                        }}
                        value={submissionType}
                    />
                </FRow>
                <FRow>
                    <Label>Notes</Label>
                    <Input
                        type="text"
                        name="notes"
                        onChange={(e) => {
                            setNotes(e.target.value);
                        }}
                        value={notes}
                    />
                </FRow>

                <Button
                    backgroundColor={'blue'}
                    marginTop="1em"
                    sx={{
                        ':hover': {
                            backgroundColor: 'tomato',
                        },
                    }}
                >
                    Submit
                </Button>
            </Flex>
        </Box>
    );
};

export default Record;
