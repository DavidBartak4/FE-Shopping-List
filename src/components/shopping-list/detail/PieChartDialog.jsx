import React, { useState, useEffect } from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from "@mui/material"
import { PieChart as RePieChart, Pie, Cell, Tooltip, Legend } from "recharts"

const PieChartDialog = ({
  pieChartOpen,
  handlePieChartClose,
  chartData,
  COLORS,
  resolvedCount,
  unresolvedCount,
  translate,
}) => {
  const [chartDimensions, setChartDimensions] = useState({
    width: Math.min(500, window.innerWidth * 0.8),
    height: Math.min(500, window.innerHeight * 0.5),
    outerRadius: Math.min(
      120,
      window.innerWidth * 0.2,
      window.innerHeight * 0.2
    ),
  })

  useEffect(() => {
    const handleResize = () => {
      const minDimension = Math.min(window.innerWidth, window.innerHeight)
      const scaleFactor = Math.min(0.8, minDimension / 1000)
      setChartDimensions({
        width: Math.max(200, Math.min(350, 400 * scaleFactor)),
        height: Math.max(200, Math.min(350, 400 * scaleFactor)),
        outerRadius: Math.max(50, Math.min(90, 80 * scaleFactor)),
      })
    }

    window.addEventListener("resize", handleResize)
    handleResize()
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <Dialog
      open={pieChartOpen}
      onClose={handlePieChartClose}
      fullWidth
      maxWidth="sm"
      sx={{
        "& .MuiDialog-paper": {
          width: "90%",
          maxWidth: "600px",
          height: "auto",
          maxHeight: "90vh",
          overflow: "hidden",
        },
      }}
    >
      <DialogTitle
        sx={{
          textAlign: "center",
          fontSize: "1.2rem",
          "@media (max-width: 600px)": {
            fontSize: "1rem",
          },
        }}
      >
        {translate("chartTitle")}
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          overflowY: "auto",
          padding: "24px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "90vw",
            maxHeight: "50vh",
            display: "flex",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <RePieChart
            width={chartDimensions.width}
            height={chartDimensions.height}
          >
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={chartDimensions.outerRadius}
              label={false}
              labelLine={false}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              layout="horizontal"
              align="center"
              verticalAlign="top"
              wrapperStyle={{
                fontSize: "0.8rem",
                margin: "10px auto 0 auto",
                maxWidth: "100%",
                textAlign: "center",
              }}
            />
          </RePieChart>
        </Box>
        <Typography
          variant="body2"
          mt={2}
          sx={{
            fontSize: "12px",
            "@media (max-height: 400px)": {
              fontSize: "10px",
            },
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {translate("resolved")}: {resolvedCount} (
          {(
            (resolvedCount / (resolvedCount + unresolvedCount)) * 100 || 0
          ).toFixed(1)}
          %)
          <br />
          {translate("unresolved")}: {unresolvedCount} (
          {(
            (unresolvedCount / (resolvedCount + unresolvedCount)) * 100 || 0
          ).toFixed(1)}
          %)
        </Typography>
      </DialogContent>
      <DialogActions
        sx={{
          paddingX: 3,
          paddingY: 2,
          justifyContent: "flex-end",
        }}
      >
        <Button
          onClick={handlePieChartClose}
          color="secondary"
          variant="outlined"
          sx={{
            borderRadius: "20px",
            border: "1px solid #B0B0B0",
            padding: "6px 16px",
            fontSize: "12px",
            textTransform: "none",
            "@media (max-width: 600px)": {
              fontSize: "10px",
            },
          }}
        >
          {translate("close")}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default PieChartDialog