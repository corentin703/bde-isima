import { TextField } from "mui-rff"
import { useForm } from "react-final-form"
import FormGroup from "@material-ui/core/FormGroup"
import { FieldArray } from "react-final-form-arrays"
import IconButton from "@material-ui/core/IconButton"

import Close from "mdi-material-ui/Close"

import EnhancedTextField from "app/components/forms/EnhancedTextfield"

export default function OptionForm({ groupOptionName, groupOptionIdx }) {
  const form = useForm()

  const onDeleteItem = (name, idx) => () => form.mutators.remove(name, idx)

  return (
    <FormGroup aria-label={`Groupes d'options du produit ${groupOptionIdx + 1}`}>
      <FieldArray name={`${groupOptionName}.options`}>
        {({ fields }) =>
          fields.map((optionName, optionIdx) => (
            <div key={optionIdx} className="flex flex-col md:flex-row items-center">
              <TextField
                className="my-1 md:mr-1"
                type="text"
                name={`${optionName}.name`}
                label="Nom"
              />
              <EnhancedTextField
                className="my-1 md:ml-1"
                type="number"
                name={`${optionName}.price`}
                label="Prix"
                inputProps={{ step: 0.01 }}
              />
              <IconButton
                className="m-2"
                onClick={onDeleteItem(`${groupOptionName}.options`, optionIdx)}
                aria-label="Supprimer"
                size="small"
              >
                <Close />
              </IconButton>
            </div>
          ))
        }
      </FieldArray>
    </FormGroup>
  )
}
