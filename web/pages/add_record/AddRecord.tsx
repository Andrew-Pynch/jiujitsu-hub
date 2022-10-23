import { Input, Label, Radio } from '@rebass/forms';
import { useState } from 'react';
import { Box, Button, Flex, Heading } from 'rebass';
import FRow from '../../components/FRow';
import { EMatchResult, IMatchRecord } from '../../domain/MatchRecord';
import { useMatchRecordApi } from '../../middleware/useMatchRecordApi';

type AddRecordProps = {};

const AddRecord = (props: AddRecordProps) => {
    const { addMatchRecord } = useMatchRecordApi();

    const [opponent, setOponent] = useState('');
    const [result, setResult] = useState<
        'won' | 'stalled' | 'tied' | 'lost' | ''
    >('');
    const [approximateDuration, setApproximateDuration] = useState(0);
    const [resultBy, setResultBy] = useState<EMatchResult>(EMatchResult.POINTS);
    const [submissionType, setSubmissionType] = useState('');
    const [notes, setNotes] = useState('');
    const [positionsStruggledIn, setPositionsStruggledIn] = useState<string[]>(
        []
    );

    const handleAddMatchRecord = async () => {
        const recordToAdd: IMatchRecord = {
            match_id: '',
            opponent: opponent,
            won: result === 'won',
            lost: result === 'lost',
            tied: result === 'tied',
            stalled: result === 'stalled',
            approximate_match_duration: approximateDuration,
            result_by: resultBy,
            submission_type: submissionType,
            positions_struggled_in: positionsStruggledIn,
            notes: notes,
        };

        const json = await addMatchRecord(recordToAdd);
        resetFields();
        // focus cursor on opponent field after submission
        document.getElementById('opponent')?.focus();
    };

    const resetFields = () => {
        setOponent('');
        setResult('');
        setApproximateDuration(0);
        setResultBy(EMatchResult.POINTS);
        setSubmissionType('');
        setNotes('');
        setPositionsStruggledIn([]);
    };

    return (
        <Box>
            <Flex
                sx={{
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                }}
            >
                <FRow>
                    <Label>Opponent</Label>
                    <Input
                        id="opponent"
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
                            onClick={(e) => setResultBy(EMatchResult.POINTS)}
                        />
                        Points
                    </Label>
                    <Label>
                        <Radio
                            name="resultby"
                            onClick={(e) =>
                                setResultBy(EMatchResult.SUBMISSION)
                            }
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
                    onClick={handleAddMatchRecord}
                >
                    Submit
                </Button>
            </Flex>
        </Box>
    );
};

export default AddRecord;
