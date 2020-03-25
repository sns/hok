import React from "react";
import { Grid, Typography, TextField, FormControlLabel, Checkbox } from "@material-ui/core";

export const PaymentForm: React.FC = () => {
  return (
      <React.Fragment>
          <Typography variant="h6" gutterBottom>
              Payment method
          </Typography>
          <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                  <TextField
                      required
                      id="cardName"
                      label="Name on card"
                      fullWidth
                  />
              </Grid>
              <Grid item xs={12} md={6}>
                  <TextField
                      required
                      id="cardNumber"
                      label="Card number"
                      fullWidth
                  />
              </Grid>
              <Grid item xs={12} md={6}>
                  <TextField
                      required
                      id="expDate"
                      label="Expiry date"
                      fullWidth
                  />
              </Grid>
              <Grid item xs={12} md={6}>
                  <TextField
                      required
                      id="cvv"
                      label="CVV"
                      helperText="Last three digits on signature strip"
                      fullWidth
                  />
              </Grid>
              <Grid item xs={12}>
                  <FormControlLabel
                      control={
                          <Checkbox
                              color="secondary"
                              name="saveCard"
                              value="yes"
                          />
                      }
                      label="Remember credit card details for next time"
                  />
              </Grid>
          </Grid>
      </React.Fragment>
  );
}

export default PaymentForm;