import { Input, Radio } from '@rebass/forms';
import { useState } from 'react';
import { Box, Button, Flex } from 'rebass';
import FInput from '../../components/FInput';
import FLabel from '../../components/FLabel';
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
                    <FLabel>Opponent</FLabel>
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
                    <p
                        style={{
                            fontSize: 30,
                            fontWeight: 800,
                        }}
                    >
                        Result
                    </p>
                    <FLabel>
                        <Radio
                            name="result"
                            onClick={(e) => setResult('won')}
                        />
                        Won
                    </FLabel>
                    <FLabel>
                        <Radio
                            name="result"
                            onClick={(e) => setResult('stalled')}
                        />
                        Stalled
                    </FLabel>
                    <FLabel>
                        <Radio
                            name="result"
                            onClick={(e) => setResult('tied')}
                        />
                        Tied
                    </FLabel>
                    <FLabel>
                        <Radio
                            name="result"
                            onClick={(e) => setResult('lost')}
                        />
                        Lost
                    </FLabel>
                </FRow>
                <FRow>
                    <FLabel>Approximate Duration</FLabel>
                    <FInput
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
                    <p
                        style={{
                            fontSize: 30,
                            fontWeight: 800,
                        }}
                    >
                        Result By
                    </p>
                    <FLabel>
                        <Radio
                            name="resultby"
                            onClick={(e) => setResultBy(EMatchResult.POINTS)}
                        />
                        Points
                    </FLabel>
                    <FLabel>
                        <Radio
                            name="resultby"
                            onClick={(e) =>
                                setResultBy(EMatchResult.SUBMISSION)
                            }
                        />
                        Submission
                    </FLabel>
                </FRow>
                <FRow>
                    <FLabel>Submission Type</FLabel>
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
                    <FLabel>Notes</FLabel>
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
