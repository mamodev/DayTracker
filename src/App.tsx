import {
  CheckBoxOutlineBlankRounded,
  CheckBoxRounded,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import {
  Button,
  Checkbox,
  Dialog,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

const BIN_ID = "6445850db89b1e2299902488";
const headers = {
  "Content-Type": "application/json",
  "X-Master-Key":
    "$2b$10$ZlG8tZQOIUfgbsSOkoPhMe5VF5zKFQzWf2lYvgJxtEUn7DhfrMTWy",
  "X-Access-Key":
    "$2b$10$Steo2DXF.RETuq8P9.BH9e4xSZUHkHUFFZcCdu44SOKFZT2Oz9.De",
};

type Task = {
  title: string;
  desc: string;
  done: boolean;
  comment: string;
};

type Day = {
  dw1: Task;
  dw2: Task;
  dw3: Task;
  wo: Task;
  todo: Task[];
};

function App() {
  const [dialog, setDialog] = React.useState<number | null>(null);

  const [days, setDays] = React.useState<Day[]>([]);

  React.useEffect(() => {
    fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
      headers,
    })
      .then((data) => data.json())
      .then((data) => setDays(data.record));
  }, []);

  console.log(days);

  const handleTaskSave = () => {
    fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
      method: "PUT",
      body: JSON.stringify(days),
      headers,
    });
  };

  return (
    <>
      <Typography variant="h2" sx={{ textAlign: "center", py: 3 }}>
        Fase 2
      </Typography>

      <Grid container spacing={2} columns={7}>
        <Grid item xs={7} md={2}>
          <Typography>Space for content</Typography>
        </Grid>

        {days.map((day, i) => {
          return (
            <Grid key={i} item xs={7} md={1}>
              <Stack sx={{ border: 1, borderRadius: 2, flex: 1 }}>
                <Typography sx={{ textAlign: "center", p: 1 }}>
                  Giorno {i + 1}
                </Typography>

                <Stack sx={{ px: 1 }}>
                  <Stack direction="row" spacing={1}>
                    {day.dw1.done ? (
                      <CheckBoxRounded />
                    ) : (
                      <CheckBoxOutlineBlankRounded />
                    )}
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                      DW1
                    </Typography>

                    <Typography variant="caption">
                      {day.dw1.title !== "" ? day.dw1.title : "---"}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1}>
                    {day.dw2.done ? (
                      <CheckBoxRounded />
                    ) : (
                      <CheckBoxOutlineBlankRounded />
                    )}
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                      DW2
                    </Typography>

                    <Typography variant="caption">
                      {day.dw2.title !== "" ? day.dw2.title : "---"}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1}>
                    {day.dw3.done ? (
                      <CheckBoxRounded />
                    ) : (
                      <CheckBoxOutlineBlankRounded />
                    )}
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                      DW3
                    </Typography>

                    <Typography variant="caption">
                      {day.dw3.title !== "" ? day.dw3.title : "---"}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1}>
                    {day.wo.done ? (
                      <CheckBoxRounded />
                    ) : (
                      <CheckBoxOutlineBlankRounded />
                    )}
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                      WorkOut
                    </Typography>

                    <Typography variant="caption">
                      {day.wo.title !== "" ? day.wo.title : "---"}
                    </Typography>
                  </Stack>
                  <Button onClick={() => setDialog(i)}>Details</Button>
                </Stack>
              </Stack>
            </Grid>
          );
        })}
      </Grid>

      <Dialog open={dialog !== null} onClose={() => setDialog(null)} fullWidth>
        {dialog !== null && (
          <Stack p={2} spacing={2}>
            <Task
              name="DW1"
              value={days[dialog].dw1}
              onChange={(task) => {
                setDays((old) => {
                  const newDays = [...old];
                  newDays[dialog].dw1 = task;
                  return newDays;
                });
              }}
            />
            <Task
              name="DW2"
              value={days[dialog].dw2}
              onChange={(task) => {
                setDays((old) => {
                  const newDays = [...old];
                  newDays[dialog].dw2 = task;
                  return newDays;
                });
              }}
            />
            <Task
              name="DW3"
              value={days[dialog].dw3}
              onChange={(task) => {
                setDays((old) => {
                  const newDays = [...old];
                  newDays[dialog].dw3 = task;
                  return newDays;
                });
              }}
            />
            <Task
              name="Work Out"
              value={days[dialog].wo}
              onChange={(task) => {
                setDays((old) => {
                  const newDays = [...old];
                  newDays[dialog].wo = task;
                  return newDays;
                });
              }}
            />
            <Button variant="outlined" onClick={handleTaskSave}>
              Save
            </Button>
          </Stack>
        )}
      </Dialog>
    </>
  );
}

type TaskProps = {
  name: string;
  expanded?: boolean;
  value: Task;
  onChange: (newTask: Task) => void;
};

function Task(props: TaskProps) {
  const [expanded, setExpanded] = React.useState(!!props.expanded);

  return (
    <Stack spacing={1}>
      <Stack direction="row" alignItems="center">
        <Typography sx={{ fontWeight: 600 }}>{props.name}</Typography>
        <IconButton size="small" onClick={() => setExpanded((old) => !old)}>
          {expanded ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Stack>

      <TextField
        placeholder="Task title"
        value={props.value.title}
        onChange={({ target }) =>
          props.onChange({ ...props.value, title: target.value })
        }
      />

      {expanded && (
        <>
          <TextField
            placeholder="Task description"
            value={props.value.desc}
            onChange={({ target }) =>
              props.onChange({ ...props.value, desc: target.value })
            }
          />
          <Stack
            direction="row"
            justifyContent="flex-end"
            spacing={1}
            alignItems="center"
          >
            <TextField
              placeholder="Comment"
              fullWidth
              value={props.value.comment}
              onChange={({ target }) =>
                props.onChange({ ...props.value, comment: target.value })
              }
            />
            <Typography>Done</Typography>
            <Checkbox
              checked={props.value.done}
              onChange={({ target }) =>
                props.onChange({ ...props.value, done: target.checked })
              }
            />
          </Stack>
        </>
      )}
    </Stack>
  );
}

export default App;

{
  /* 
  
  const defaultTask = {
  title: "",
  desc: "",
  done: false,
  comment: "",
};
s
  <Button
onClick={() => {
  const days = Array.from(Array(80)).map(() => ({
    dw1: defaultTask,
    dw2: defaultTask,
    dw3: defaultTask,
    wo: defaultTask,
    todo: [],
  }));

  fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
    method: "PUT",
    body: JSON.stringify(days),
    headers,
  });
}}
>
Send
</Button> */
}
