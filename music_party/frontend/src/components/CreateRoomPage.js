import React, {useState} from 'react'
import {Button, Grid, Typography, TextField, FormHelperText, FormControl, Radio, RadioGroup, FormControlLabel} from '@material-ui/core'
import {Link} from 'react-router-dom'

const CreateRoomPage = props =>{
    //State
    const [GuestCanPauseState, setGuestCanPauseState] = useState(true)
    const [VotesToSkipState, setVotesToSkipState] = useState(2)

    //Functions
    const handleVotesChange = e => setVotesToSkipState(e.target.value)

    const handleGuestCanPauseChange = e => setGuestCanPauseState(e.target.value === 'true' ? true : false)

    const handleRoomButtonPressed = () => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                votes_to_skip: VotesToSkipState,
                guest_can_pause: GuestCanPauseState
            })
        }

        fetch('/api/create-room', requestOptions).then(response=>response.json()).then(data =>props.history.push('/room/'+data.code))
    }
    
    return(
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography component='h4' variant='h4'>Create A Room</Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl>
                    <FormHelperText>Guest Control of Playback State</FormHelperText>
                    <RadioGroup row defaultValue='true' onChange={handleGuestCanPauseChange}>
                        <FormControlLabel value='true' label='Play/Pause' labelPlacement='bottom' control={<Radio color='primary'/>}/>
                        <FormControlLabel value='false' label='No Control' labelPlacement='bottom' control={<Radio color='secondary'/>}/>
                    </RadioGroup>
                </FormControl>    
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl>
                    <TextField required type='number' defaultValue={2} inputProps={{min:1}} onChange={handleVotesChange}/>
                    <FormHelperText>Votes required to skip song</FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center">
                <Button color="primary" variant='contained' onClick={handleRoomButtonPressed}>Create A Room</Button>
            </Grid>
            <Grid item xs={12} align="center">
                <Button color="secondary" variant='contained' to='/' component={Link}>Back</Button>
            </Grid>
        </Grid>
    )
}

export default CreateRoomPage