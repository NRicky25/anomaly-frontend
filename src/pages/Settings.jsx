// Settings.js
import React, { useState, useEffect } from "react";
import { Button, Input, InputNumber, Form, message } from "antd";
import { fetchSettings, updateSettings } from "../services/api";

const Settings = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleFetchSettings = async () => {
    setLoading(true);
    try {
      const settings = await fetchSettings();
      form.setFieldsValue({
        OPTIMAL_THRESHOLD: settings.OPTIMAL_THRESHOLD,
      });
    } catch (error) {
      message.error("Failed to load settings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchSettings();
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await updateSettings(values);
      message.success("Settings updated successfully!");
    } catch (error) {
      message.error("Failed to update settings.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <p className="text-gray-400 mb-8">
        Manage and fine-tune application parameters.
      </p>

      <div className="bg-card p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Fraud Model Threshold</h2>
        <p className="text-sm text-light-gray mb-4">
          Adjust the fraud probability threshold. Transactions with a
          probability above this value will be flagged as fraudulent.
        </p>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="optimal_threshold"
            label="Optimal Threshold"
            rules={[
              { required: true, message: "Please enter a threshold value" },
              {
                type: "number",
                min: 0,
                max: 1,
                message: "Threshold must be between 0 and 1",
              },
            ]}
          >
            <InputNumber
              min={0}
              max={1}
              step={0.01}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Save Settings
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Settings;
