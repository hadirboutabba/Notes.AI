# Notes.AI: NLP and Reinforcement Learning-Based Web App for Video Recommendations on Psychological Wellness

Notes.AI is a web application designed to help users deal with their psychological struggles by recommending personalized video and podcast content. By leveraging **natural language processing (NLP)** and **reinforcement learning (RL)**, the system suggests relevant stories and experiences of individuals who have gone through similar challenges, promoting mental health awareness and providing a sense of connection and support.

The main functionality of the app involves:
 1. Processing textual data
 2. Reducing processed data dimensionality via an autoencoder
 3. Training a Q-learning agent to recommend video content.
    

<p style="text-align: center;">
  <iframe src="mindshift.pdf" width="600" height="444"></iframe>
</p>

# Key Features
### 1. Data Preprocessing pipeline
  
 Cleanses text by removing unnecessary noise such as punctuation, numbers, and repetitive characters.
 Filters out irrelevant words using stopword removal and retains meaningful vocabulary from a curated English dictionary.
    
### 2. Autoencoder for Embedding Generation
 
 Compresses high-dimensional text vectorizations into concise, informative embeddings.
 Enables efficient downstream processing while preserving essential semantic features.

### 3. AI-Powered Video Recommendations

 Trains a Q-learning agent to optimize video selection by simulating user interactions.
 Uses a flexible reward mechanism to balance exploration and exploitation, driving adaptive learning.
    
### 4. User-Friendly Web Application utilizing our NLP\RL models

A user-friendly web app that allows users to input their psychological struggles and receive relevant content based on their needs.


# Project Architecture

 Text Preprocessing Pipeline
 Prepares raw text for analysis through tokenization, cleaning, and stopword removal.

 Dimensionality Reduction with Autoencoder
 Reduces one-hot encoded text vectors into low-dimensional embeddings, balancing data efficiency and feature richness.

 Reinforcement Learning for Recommendations
 A Q-learning agent interacts with embeddings and learns an optimal recommendation strategy by maximizing reward signals based on user simulation, all inside a user-friendly web app.

In-Depth Guide
1. Text Preprocessing

    Input: Raw text strings from the dataset.
    Processing Steps:
        Convert text to lowercase, remove punctuation and numbers.
        Eliminate common stopwords and retain meaningful English words.
        Tokenize text into individual words.
    Output: A cleaned and tokenized version of the input text.

2. Dimensionality Reduction

    The processed text is transformed into a one-hot encoded matrix using CountVectorizer.
    An autoencoder neural network compresses the matrix into a low-dimensional representation while retaining semantic relevance.
    These embeddings serve as input states for the Q-learning agent.

## 3. Reinforcement Learning
 **Agent Setup:**
 The state space consists of embeddings representing video data. The action space includes combinations of video IDs that the agent can recommend.
 **Training:**
 The agent learns through simulated user interactions, guided by a reward mechanism: 
  * Positive rewards for engaging recommendations (e.g., watched or completed videos).
  * Penalties for irrelevant or unengaging recommendations.
 **Output:**
 A trained Q-learning agent capable of making intelligent video recommendations.

