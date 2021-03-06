import { Select } from "mui-rff"
import { useForm } from "react-final-form"
import MuiCard from "@material-ui/core/Card"
import Button from "@material-ui/core/Button"
import Divider from "@material-ui/core/Divider"
import MenuItem from "@material-ui/core/MenuItem"
import FormGroup from "@material-ui/core/FormGroup"
import FormLabel from "@material-ui/core/FormLabel"
import { FieldArray } from "react-final-form-arrays"
import IconButton from "@material-ui/core/IconButton"
import CardHeader from "@material-ui/core/CardHeader"
import Typography from "@material-ui/core/Typography"
import FormControl from "@material-ui/core/FormControl"
import CircularProgress from "@material-ui/core/CircularProgress"

import Plus from "mdi-material-ui/Plus"
import Check from "mdi-material-ui/Check"
import Close from "mdi-material-ui/Close"

import EnhancedTextField from "app/components/forms/EnhancedTextfield"

type EditCardProps = {
  subscription: any
  onStopEdit: () => void
}

export default function EditCard({ subscription, onStopEdit }: EditCardProps) {
  const form = useForm()
  const { submitting } = form.getState()

  const onSubmit = () => form.submit()

  const onAddItem = (name) => () => form.mutators.push(name, undefined)

  const onDeleteItem = (name, idx) => () => form.mutators.remove(name, idx)

  return (
    <MuiCard className="w-full flex flex-col">
      <CardHeader
        className="flex-grow items-start"
        classes={{ content: "flex flex-col h-full" }}
        title={`${subscription.user.firstname} ${subscription.user.lastname}`}
        titleTypographyProps={{ variant: "subtitle2" }}
        subheader={
          <Select
            name="payment_method"
            label="Paiement par"
            formControlProps={{ margin: "normal" }}
          >
            <MenuItem value="BDE">BDE</MenuItem>
            <MenuItem value="LYDIA">LYDIA</MenuItem>
            <MenuItem value="CASH">LIQUIDE</MenuItem>
          </Select>
        }
        subheaderTypographyProps={{ className: "flex flex-grow items-end", variant: "caption" }}
        action={
          <div className="flex">
            <IconButton aria-label="Annuler" onClick={onStopEdit} disabled={submitting}>
              <Close />
            </IconButton>

            <IconButton aria-label="Sauvegarder" disabled={submitting} onClick={onSubmit}>
              {submitting ? <CircularProgress size={25} color="inherit" /> : <Check />}
            </IconButton>
          </div>
        }
      />

      <FieldArray name="cart">
        {({ fields }) => (
          <>
            {fields.map((cartItemName, cartItemIdx) => (
              <>
                <div
                  key={cartItemIdx}
                  className="relative flex flex-col p-4 m-4 border border-gray-200"
                >
                  <IconButton
                    className="absolute top-0 right-0 transform-gpu translate-x-1/2 -translate-y-1/2 bg-white border border-solid border-gray-200"
                    onClick={onDeleteItem("cart", cartItemIdx)}
                    aria-label="Supprimer"
                    size="small"
                  >
                    <Close />
                  </IconButton>

                  <FormControl className="relative my-3 flex flex-col" component="fieldset">
                    <FormLabel component="legend">Produit n°{cartItemIdx + 1}</FormLabel>
                    <Divider className="m-2" />

                    <FormGroup aria-label={`Produit n°${cartItemIdx + 1}`}>
                      <div className="flex flex-col md:flex-row">
                        <EnhancedTextField
                          className="my-1 md:mr-1"
                          type="number"
                          name={`${cartItemName}.quantity`}
                          label="Quantité"
                        />
                        <EnhancedTextField
                          className="my-1 md:ml-1"
                          type="text"
                          name={`${cartItemName}.name`}
                          label="Nom"
                        />
                      </div>
                      <div className="flex flex-col md:flex-row">
                        <EnhancedTextField
                          className="my-1 md:mr-1"
                          type="number"
                          name={`cart[${cartItemIdx}].price`}
                          label="Prix"
                          inputProps={{ step: 0.01 }}
                        />
                        <EnhancedTextField
                          className="my-1 md:ml-1"
                          type="text"
                          name={`cart[${cartItemIdx}].comment`}
                          label="Commentaire"
                        />
                      </div>

                      <FormControl className="m-3 flex flex-col" component="fieldset">
                        <FormLabel className="flex items-center justify-evenly" component="legend">
                          <Typography>Options</Typography>
                          <IconButton
                            className="m-2"
                            onClick={onAddItem(`${cartItemName}.options`)}
                            aria-label={`Ajouter une option au produit n°${cartItemIdx}`}
                            size="small"
                          >
                            <Plus />
                          </IconButton>
                        </FormLabel>
                        <Divider className="m-2" />

                        <FormGroup aria-label={`Options du produit ${cartItemIdx + 1}`}>
                          <FieldArray name={`${cartItemName}.options`}>
                            {({ fields }) =>
                              fields.map((cartItemOptionName, cartItemOptionIdx) => (
                                <div className="flex flex-col md:flex-row" key={cartItemOptionIdx}>
                                  <EnhancedTextField
                                    className="my-1 md:mr-1"
                                    type="text"
                                    name={`${cartItemOptionName}.name`}
                                    label="Nom de l'option"
                                  />
                                  <div className="flex items-center">
                                    <EnhancedTextField
                                      className="my-1 md:ml-1"
                                      type="number"
                                      name={`${cartItemOptionName}.price`}
                                      label="Prix"
                                      inputProps={{ step: 0.01 }}
                                    />
                                    <IconButton
                                      className="m-2"
                                      onClick={onDeleteItem(
                                        `${cartItemName}.options`,
                                        cartItemOptionIdx
                                      )}
                                      aria-label="Supprimer"
                                      size="small"
                                    >
                                      <Close />
                                    </IconButton>
                                  </div>
                                </div>
                              ))
                            }
                          </FieldArray>
                        </FormGroup>
                      </FormControl>
                    </FormGroup>
                  </FormControl>

                  {(!fields.length || cartItemIdx === fields.length - 1) && (
                    <IconButton
                      className="absolute bottom-0 right-0 transform-gpu translate-x-1/2 translate-y-1/2 bg-white border border-solid border-gray-200"
                      onClick={onAddItem("cart")}
                      aria-label="Ajouter un produit"
                      size="small"
                    >
                      <Plus />
                    </IconButton>
                  )}
                </div>
              </>
            ))}

            {!fields?.length && (
              <Button
                className="ml-auto m-2"
                startIcon={<Plus />}
                aria-label="Ajouter"
                onClick={onAddItem("cart")}
                variant="contained"
                color="primary"
              >
                Créer un panier
              </Button>
            )}
          </>
        )}
      </FieldArray>
    </MuiCard>
  )
}
