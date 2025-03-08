# Computer Engineering Graduation Project with Thesis

# Apple Disease Classification with CNN

## Overview
This project focuses on classifying apple leaf diseases using a Convolutional Neural Network (CNN). The dataset consists of images of apple leaves affected by three common diseases: Apple Scab, Black Rot, and Cedar Apple Rust, along with healthy leaves. The final model achieves high accuracy and is integrated into a cross-platform mobile application for real-time disease detection.
![image](https://github.com/user-attachments/assets/a3f79c7b-315a-4133-8f54-9f3e827bcad4)
![image](https://github.com/user-attachments/assets/95dffca0-1fd0-4b3a-a0fe-6f56b21db4e2)
![image](https://github.com/user-attachments/assets/d3805c91-b54c-4464-9dc8-7b6386412dbe)

## Dataset
**Apple Disease Dataset** used from Kaggle, which contains:
- **Training set:** 2,218 images
- **Validation set:** 634 images
- **Test set:** 319 images
- **Classes:** Apple Scab, Black Rot, Cedar Apple Rust, and Healthy

## Preprocessing Steps
Before training the CNN model, several preprocessing steps were applied:
- **Data Collection:** Retrieved dataset from Kaggle.
- **Data Resizing & Rescaling:** Standardized image dimensions and scaled pixel values.
- **Data Augmentation:** Applied rotation, flipping, and scaling to improve generalization.

![image](https://github.com/user-attachments/assets/05ea6e4f-0223-42cd-ae84-2583da0b4ca6)


## Model Architecture
The CNN model consists of multiple convolutional layers followed by pooling and fully connected layers:
- **Conv2D layers** with ReLU activation (32 filters in the first layer, 64 in subsequent layers, 3x3 kernel size)
- **MaxPooling2D layers** (2x2 pool size) for dimensionality reduction
- **Dropout layers** (0.5 dropout rate) to prevent overfitting
- **Fully connected (Dense) layers** with 64 neurons
- **Softmax activation** for multi-class classification
- **Adam optimizer** used for optimization
- 
![image](https://github.com/user-attachments/assets/4a35db52-6179-47a6-810f-fb429270d3c0)


## Evaluation Metrics
To evaluate the model, the following metrics were used:
- **Accuracy:** Measures overall correctness of predictions.
- **Precision & Recall:** Assesses the model’s ability to correctly classify each disease.
- **F1-Score:** Balances precision and recall for better model performance.
- **Confusion Matrix:** Visualizes model classification performance and misclassifications.

![image](https://github.com/user-attachments/assets/1601c0b5-6e01-4c14-a171-73c5326b0898)

![image](https://github.com/user-attachments/assets/f653d132-1810-4aca-bd29-255aa43eea82)

![image](https://github.com/user-attachments/assets/7d90259e-d2a2-47f5-a957-e069db2875e2)

## Experimental Results
- **Validation Accuracy:** 98.10%
- **Test Accuracy:** 96.55%
  
![image](https://github.com/user-attachments/assets/f71911ce-a98d-40b1-ab91-43beab22f3c8)

## Mobile Application Development
The trained model is deployed as a **cross-platform mobile application** (iOS & Android). The choice of a mobile application is due to:
- Wide accessibility and ease of use for farmers and agricultural experts
- Faster execution compared to web-based solutions
- Offline capability for remote usage
- Optimized performance for real-time leaf disease detection
  
![image](https://github.com/user-attachments/assets/20653bd7-5476-4204-9f0e-738e0547a8fb)
![image](https://github.com/user-attachments/assets/0bbdeae6-8ef1-4821-ae9f-4f302de2d91c)
![image](https://github.com/user-attachments/assets/b7b56ab3-7853-4398-9475-0e7896582d28)
![image](https://github.com/user-attachments/assets/dd8ad5a0-42db-4946-8079-c53820ad6cd6)
![image](https://github.com/user-attachments/assets/aa8a9fb1-4d3c-496f-a007-63f4db2838d8)

### Requirements
- Python 3.x
- TensorFlow / Keras
- OpenCV, NumPy, Matplotlib
- Mobile development framework (Flutter/React Native)



backend kısmı için ilk kez çalıştırırken sırasıyla ;

cd backend
pip install -r requirements.txt

yapıyoruz. routerlarda kendi bilgisayarımın IP'si tanımlı şu an localhost ile çalışmadı bir türlü. 
O yüzden IP'li kalmak durumunda kaldı, o kısımlara kendi IP'nizi vermeniz lazım hem app.py içerisinde hem de HomeScreen.js içerisinde yapmanız lazım bunu. (Main,Plant hariç tüm screenlerde)
app.py içerisindeki modelin yolunu da kendi pc'nize göre vermeyi unutmayın. Tşkler.

